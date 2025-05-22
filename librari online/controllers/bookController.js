const Book = require('../models/bookModel');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.getBookById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createBook = async (req, res) => {
  try {
    await Book.createBook(req.body);
    res.status(201).json({ message: 'Book created' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    await Book.updateBook(req.params.id, req.body);
    res.json({ message: 'Book updated' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.deleteBook(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};