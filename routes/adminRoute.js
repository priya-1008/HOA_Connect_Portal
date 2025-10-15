const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { getResidents, addResident, updateResident, deleteResident } = require("../controllers/adminController");

const router = express.Router();

router.use(protect); // all routes below need authentication

router.get("/getresidents", authorizeRoles("admin"), getResidents);
router.post("/addresident", authorizeRoles("admin"), addResident);
router.put("/updateresidents/:id", authorizeRoles("admin"), updateResident);
router.delete("/deleteresidents/:id", authorizeRoles("admin"), deleteResident);

module.exports = router;