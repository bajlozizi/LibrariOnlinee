const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

module.exports = router;