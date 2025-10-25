const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  title: { type: String, maxlength: 100 },
  description: { type: String, maxlength: 200 },
  meetingDate: { type: Date },
  location: { type: String, maxlength: 100 },
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // createdBy (admin)
  // attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "MeetingAttendee" }]
}, { timestamps: true });

module.exports = mongoose.model("Meeting", meetingSchema);