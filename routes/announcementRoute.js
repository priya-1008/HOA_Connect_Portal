const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { createAnnouncement, getAnnouncements } = require("../controllers/announcementController");
const router = express.Router();

router.post("/addannouncement", protect, authorizeRoles("admin"), createAnnouncement);
router.get("/getannouncements", protect, authorizeRoles("admin"), getAnnouncements);

module.exports = router;