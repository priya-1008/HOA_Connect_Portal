const mongoose = require('mongoose');

const CommunitySchema = new mongoose.Schema({
  communityId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin who manages community
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Community', CommunitySchema);