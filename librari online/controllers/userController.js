const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, role = 'customer' } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const pool = await db;
    await pool.request()
      .input('FirstName', firstName)
      .input('LastName', lastName)
      .input('Email', email)
      .input('PasswordHash', hashedPassword)
      .input('Role', role)
      .query(`
        INSERT INTO Customers (FirstName, LastName, Email, PasswordHash, IsActive)
        VALUES (@FirstName, @LastName, @Email, @PasswordHash, 1)
      `);

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await db;
    const result = await pool.request()
      .input('Email', email)
      .query('SELECT * FROM Customers WHERE Email = @Email');

    const user = result.recordset[0];
    if (!user) return res.status(400).json({ error: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, user.PasswordHash);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign(
      { id: user.CustomerID, role: user.Role || 'customer' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};