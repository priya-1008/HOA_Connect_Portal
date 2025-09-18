const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const ROLES = require('../config/roles');

router.get('/superadmin', authMiddleware, roleMiddleware([ROLES.SUPERADMIN]), (req, res) => {
  res.json({ message: 'Welcome SuperAdmin', user: req.user });
});
router.get('/admin', authMiddleware, roleMiddleware([ROLES.ADMIN]), (req, res) => {
  res.json({ message: 'Welcome Admin', user: req.user });
});
router.get('/resident', authMiddleware, roleMiddleware([ROLES.RESIDENT]), (req, res) => {
  res.json({ message: 'Welcome Resident', user: req.user });
});

module.exports = router;