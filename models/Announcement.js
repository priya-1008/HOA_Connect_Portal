const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  message: { type: String, required: true, maxlength: 255 },
  communityId: { type: mongoose.Schema.Types.ObjectId, required: "Community" }, // Links to Community.communityId
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin who posted the announcement
}, {
  timestamps: { createdAt: true, updatedAt: false } 
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);