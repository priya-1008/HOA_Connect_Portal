const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  question: { type: String, maxlength: 100 },
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  options: [{ option: String, votes: { type: Number, default: 0 }}],
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Poll", pollSchema);