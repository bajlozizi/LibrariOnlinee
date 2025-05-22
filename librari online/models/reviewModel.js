const db = require('../db');

exports.getReviewsForBook = async (bookId) => {
  const pool = await db;
  const result = await pool.request().input('bookId', bookId)
    .query('SELECT * FROM Reviews WHERE BookID = @bookId');
  return result.recordset;
};

exports.createReview = async (review) => {
  const { CustomerID, BookID, Rating, ReviewText } = review;
  const pool = await db;
  return await pool.request()
    .input('CustomerID', CustomerID)
    .input('BookID', BookID)
    .input('Rating', Rating)
    .input('ReviewText', ReviewText)
    .query(`INSERT INTO Reviews (CustomerID, BookID, Rating, ReviewText)
            VALUES (@CustomerID, @BookID, @Rating, @ReviewText)`);
};

exports.deleteReview = async (id) => {
  const pool = await db;
  return await pool.request().input('id', id).query('DELETE FROM Reviews WHERE ReviewID = @id');
};
