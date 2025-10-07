const express = require("express");
const router = express.Router();
const {
  createCommunity,
  getAllCommunities,
  updateCommunity,
  deleteCommunity,
  assignAdmin,
  removeAdmin
} = require("../controllers/communityController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.use(protect); // all routes below need authentication

router.post("/", authorizeRoles("superadmin"), createCommunity);
router.get("/", authorizeRoles("superadmin"), getAllCommunities);
router.put("/:id", authorizeRoles("superadmin"), updateCommunity);
router.delete("/:id", authorizeRoles("superadmin"), deleteCommunity);
  
router.post("/assign-admin", authorizeRoles("superadmin"), assignAdmin);
router.post("/remove-admin", authorizeRoles("superadmin"), removeAdmin);

module.exports = router;