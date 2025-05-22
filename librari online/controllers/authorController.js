const Author = require('../models/authorModel');

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.getAllAuthors();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createAuthor = async (req, res) => {
  try {
    await Author.createAuthor(req.body);
    res.status(201).json({ message: 'Author created' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    await Author.updateAuthor(req.params.id, req.body);
    res.json({ message: 'Author updated' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    await Author.deleteAuthor(req.params.id);
    res.json({ message: 'Author deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
