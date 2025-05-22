const Category = require('../models/categoryModel');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    await Category.createCategory(req.body);
    res.status(201).json({ message: 'Category created' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    await Category.updateCategory(req.params.id, req.body);
    res.json({ message: 'Category updated' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.deleteCategory(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};