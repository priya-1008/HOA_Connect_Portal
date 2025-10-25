const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 500 },
  isActive: { type: Boolean, default: true },
  bookings: { type: mongoose.Schema.Types.ObjectId, ref: "AmenityBooking" }, // Links to Community.communityId
});

module.exports = mongoose.model('Amenity', AmenitySchema);