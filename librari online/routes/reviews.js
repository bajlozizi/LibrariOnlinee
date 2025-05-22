const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');

router.get('/book/:bookId', controller.getReviewsForBook);
router.post('/', controller.createReview);
router.delete('/:id', controller.deleteReview);

module.exports = router;