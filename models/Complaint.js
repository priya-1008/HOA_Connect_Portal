const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  subject: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 500 },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending'   
  },  
  communityId: { type: mongoose.Schema.Types.ObjectId, required: "Community" }, // Links to Community.communityId
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Resident who filed the complaint
}, { timestamps: true }
);

module.exports = mongoose.model('Complaint', ComplaintSchema);