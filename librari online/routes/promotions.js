const express = require('express');
const router = express.Router();
const controller = require('../controllers/promoController');

router.get('/', controller.getAllPromotions);
router.post('/', controller.createPromotion);
router.put('/:id', controller.updatePromotion);
router.delete('/:id', controller.deletePromotion);

module.exports = router;

