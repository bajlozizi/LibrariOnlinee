const db = require('../db');

exports.getAllCategories = async () => {
  const pool = await db;
  const result = await pool.request().query('SELECT * FROM Categories');
  return result.recordset;
};

exports.getCategoryById = async (id) => {
  const pool = await db;
  const result = await pool.request().input('id', id).query('SELECT * FROM Categories WHERE CategoryID = @id');
  return result.recordset[0];
};

exports.createCategory = async (category) => {
  const { CategoryName, Description } = category;
  const pool = await db;
  return await pool.request()
    .input('CategoryName', CategoryName)
    .input('Description', Description)
    .query('INSERT INTO Categories (CategoryName, Description) VALUES (@CategoryName, @Description)');
};

exports.updateCategory = async (id, category) => {
  const { CategoryName, Description } = category;
  const pool = await db;
  return await pool.request()
    .input('id', id)
    .input('CategoryName', CategoryName)
    .input('Description', Description)
    .query('UPDATE Categories SET CategoryName = @CategoryName, Description = @Description WHERE CategoryID = @id');
};

exports.deleteCategory = async (id) => {
  const pool = await db;
  return await pool.request().input('id', id).query('DELETE FROM Categories WHERE CategoryID = @id');
};
