// const express = require("express");
// const { getAllPayments, getCommunityPayments, updatePaymentStatus } = require("../controllers/paymentController");
// const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.get("/getpayment", protect, authorizeRoles("superadmin"), getAllPayments);
// router.get("/getcommunitypayments", protect, authorizeRoles("admin"), getCommunityPayments);
// router.put("/updatepaymentstatus/:id", protect, authorizeRoles("admin"), updatePaymentStatus);

// module.exports = router;

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
// const authMiddleware = require('../middleware/auth');
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.use(protect); // all routes below need authentication

// Payments
router.post('/addpayment', authorizeRoles("superadmin"), paymentController.createPayment);
router.get('/getpayment/community/:communityId', authorizeRoles("superadmin"), paymentController.getCommunityPayments);
router.get('/getallpayment', authorizeRoles("superadmin"), paymentController.getAllPayments);

module.exports = router;