const Review = require('../models/reviewModel');

exports.getReviewsForBook = async (req, res) => {
  try {
    const reviews = await Review.getReviewsForBook(req.params.bookId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createReview = async (req, res) => {
  try {
    await Review.createReview(req.body);
    res.status(201).json({ message: 'Review added' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.deleteReview(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
