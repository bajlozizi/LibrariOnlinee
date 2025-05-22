const db = require('../db');

exports.getAllBooks = async () => {
  const pool = await db;
  const result = await pool.request().query('SELECT * FROM Books');
  return result.recordset;
};

exports.getBookById = async (id) => {
  const pool = await db;
  const result = await pool.request().input('id', id).query('SELECT * FROM Books WHERE BookID = @id');
  return result.recordset[0];
};

exports.createBook = async (book) => {
  const { Title, Description, Price, CategoryID, AuthorID, ISBN, PublishedDate, PageCount, CoverImageURL, Stock } = book;
  const pool = await db;
  const result = await pool.request()
    .input('Title', Title)
    .input('Description', Description)
    .input('Price', Price)
    .input('CategoryID', CategoryID)
    .input('AuthorID', AuthorID)
    .input('ISBN', ISBN)
    .input('PublishedDate', PublishedDate)
    .input('PageCount', PageCount)
    .input('CoverImageURL', CoverImageURL)
    .input('Stock', Stock)
    .query(`
      INSERT INTO Books (Title, Description, Price, CategoryID, AuthorID, ISBN, PublishedDate, PageCount, CoverImageURL, Stock)
      VALUES (@Title, @Description, @Price, @CategoryID, @AuthorID, @ISBN, @PublishedDate, @PageCount, @CoverImageURL, @Stock)
    `);
  return result;
};

exports.updateBook = async (id, book) => {
  const { Title, Description, Price, CategoryID, AuthorID, ISBN, PublishedDate, PageCount, CoverImageURL, Stock } = book;
  const pool = await db;
  const result = await pool.request()
    .input('id', id)
    .input('Title', Title)
    .input('Description', Description)
    .input('Price', Price)
    .input('CategoryID', CategoryID)
    .input('AuthorID', AuthorID)
    .input('ISBN', ISBN)
    .input('PublishedDate', PublishedDate)
    .input('PageCount', PageCount)
    .input('CoverImageURL', CoverImageURL)
    .input('Stock', Stock)
    .query(`
      UPDATE Books SET
        Title = @Title,
        Description = @Description,
        Price = @Price,
        CategoryID = @CategoryID,
        AuthorID = @AuthorID,
        ISBN = @ISBN,
        PublishedDate = @PublishedDate,
        PageCount = @PageCount,
        CoverImageURL = @CoverImageURL,
        Stock = @Stock
      WHERE BookID = @id
    `);
  return result;
};

exports.deleteBook = async (id) => {
  const pool = await db;
  const result = await pool.request().input('id', id).query('DELETE FROM Books WHERE BookID = @id');
  return result;
};