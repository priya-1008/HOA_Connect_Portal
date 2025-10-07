const mongoose = require("mongoose");

const amenityBookingSchema = new mongoose.Schema({
  date: { type: Date },
  slot: { type: String, maxlength: 20 },
  amenityId: { type: mongoose.Schema.Types.ObjectId, ref: "Amenity" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("AmenityBooking", amenityBookingSchema);