const express = require('express');
const router = express.Router();
const {createCommunity, getAllCommunities, deleteCommunity, replaceHoaAdmin, getGlobalPayments, sendNotification} = require('../controllers/superAdminController');
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.use(protect); // all routes below need authentication

router.post("/addCommunity", authorizeRoles("superadmin"), createCommunity);
router.get('/getcommunities', authorizeRoles("superadmin"), getAllCommunities);
router.delete('/deletecommunity/:communityId', authorizeRoles("superadmin"), deleteCommunity);
router.put('/updatecommunities/:communityId/replace-admin', authorizeRoles("superadmin"), replaceHoaAdmin);

// Global Payments Report
router.get('/payments/global', authorizeRoles("superadmin"), getGlobalPayments);

// System-wide Notifications
router.post('/addnotifications', authorizeRoles("superadmin"), sendNotification);

module.exports = router;