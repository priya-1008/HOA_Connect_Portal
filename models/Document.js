const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: { type: String, maxlength: 100 },
  fileUrl: { type: String, maxlength: 255 },
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model("Document", documentSchema);