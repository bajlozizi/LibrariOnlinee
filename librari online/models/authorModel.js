const db = require('../db');

exports.getAllAuthors = async () => {
  const pool = await db;
  const result = await pool.request().query('SELECT * FROM Authors');
  return result.recordset;
};

exports.getAuthorById = async (id) => {
  const pool = await db;
  const result = await pool.request().input('id', id).query('SELECT * FROM Authors WHERE AuthorID = @id');
  return result.recordset[0];
};

exports.createAuthor = async (author) => {
  const { FirstName, LastName, Biography } = author;
  const pool = await db;
  return await pool.request()
    .input('FirstName', FirstName)
    .input('LastName', LastName)
    .input('Biography', Biography)
    .query('INSERT INTO Authors (FirstName, LastName, Biography) VALUES (@FirstName, @LastName, @Biography)');
};

exports.updateAuthor = async (id, author) => {
  const { FirstName, LastName, Biography } = author;
  const pool = await db;
  return await pool.request()
    .input('id', id)
    .input('FirstName', FirstName)
    .input('LastName', LastName)
    .input('Biography', Biography)
    .query('UPDATE Authors SET FirstName = @FirstName, LastName = @LastName, Biography = @Biography WHERE AuthorID = @id');
};

exports.deleteAuthor = async (id) => {
  const pool = await db;
  return await pool.request().input('id', id).query('DELETE FROM Authors WHERE AuthorID = @id');
};
