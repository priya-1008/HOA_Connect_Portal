const express = require("express");
const router = express.Router();
const {
  submitComplaint,
  getMyComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// All routes here are protected
router.use(protect);

// Resident
router.post("/addcomplaint", authorizeRoles("resident"), submitComplaint);
router.get("/getmycomplaint", authorizeRoles("resident"), getMyComplaints);

// Admin
router.put("/updatestatus/:complaintId/status", authorizeRoles("admin"), updateComplaintStatus);

module.exports = router;
