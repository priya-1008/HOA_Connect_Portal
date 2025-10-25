const express = require('express');
const router = express.Router();
const amenityController = require('../controllers/amenityController');
// const authMiddleware = require('../middleware/auth');
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Amenity CRUD (accessible to superadmin)
router.use(protect); // all routes below need authentication
router.post('/addamenity', authorizeRoles("superadmin"), amenityController.createAmenity);
router.get('/getamenities', authorizeRoles("superadmin"), amenityController.getAllAmenities);
router.put('/updateamenity/:amenityId', authorizeRoles("superadmin"), amenityController.updateAmenity);
router.delete('/deleteamenity/:amenityId', authorizeRoles("superadmin"), amenityController.deleteAmenity);

module.exports = router;