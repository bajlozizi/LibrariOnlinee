const db = require('../db');

exports.getCartByCustomerId = async (customerId) => {
  const pool = await db;
  const result = await pool.request().input('customerId', customerId)
    .query('SELECT * FROM ShoppingCart WHERE CustomerID = @customerId');
  return result.recordset;
};

exports.addToCart = async (item) => {
  const { CustomerID, BookID, Quantity } = item;
  const pool = await db;
  return await pool.request()
    .input('CustomerID', CustomerID)
    .input('BookID', BookID)
    .input('Quantity', Quantity)
    .query('INSERT INTO ShoppingCart (CustomerID, BookID, Quantity) VALUES (@CustomerID, @BookID, @Quantity)');
};

exports.updateCartItem = async (id, quantity) => {
  const pool = await db;
  return await pool.request()
    .input('id', id)
    .input('Quantity', quantity)
    .query('UPDATE ShoppingCart SET Quantity = @Quantity WHERE CartID = @id');
};

exports.removeFromCart = async (id) => {
  const pool = await db;
  return await pool.request().input('id', id).query('DELETE FROM ShoppingCart WHERE CartID = @id');
};