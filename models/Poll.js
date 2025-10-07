const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  question: { type: String, maxlength: 100 },
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Poll", pollSchema);