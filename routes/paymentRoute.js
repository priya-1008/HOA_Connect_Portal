const express = require("express");
const { getAllPayments, getCommunityPayments, updatePaymentStatus } = require("../controllers/paymentController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getpayment", protect, authorizeRoles("superadmin"), getAllPayments);
router.get("/getcommunitypayments", protect, authorizeRoles("admin"), getCommunityPayments);
router.put("/updatepaymentstatus/:id", protect, authorizeRoles("admin"), updatePaymentStatus);

module.exports = router;