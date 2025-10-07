const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  communityId: { type: mongoose.Schema.Types.ObjectId, required: "Community" }, // Links to Community.communityId
});

module.exports = mongoose.model('Amenity', AmenitySchema);