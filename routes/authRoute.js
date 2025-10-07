const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const { register, login } = require('../controllers/authController');

router.post('/login', login);
// protected: only authenticated user (SuperAdmin or Admin) may call register
router.post('/register', protect, register);

module.exports = router;