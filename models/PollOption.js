const mongoose = require("mongoose");

const pollOptionSchema = new mongoose.Schema({
  optionText: { type: String, maxlength: 100 },
  votes: { type: Number, default: 0 },
  pollId: { type: mongoose.Schema.Types.ObjectId, ref: "Poll" }
});

module.exports = mongoose.model("PollOption", pollOptionSchema);