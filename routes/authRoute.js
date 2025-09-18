const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { register, login } = require('../controllers/authController');

router.post('/login', login);
// protected: only authenticated user (SuperAdmin or Admin) may call register
router.post('/register', authMiddleware, register);

module.exports = router;