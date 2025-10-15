const Complaint = require("../models/Complaint");

// ✅ Submit complaint
exports.submitComplaint = async (req, res) => {
  try {
    const { subject, description } = req.body;

    // Get user and community automatically
    const userId = req.user._id;
    const communityId = req.user.communityId;

    if (!communityId) {
      return res.status(400).json({ message: "User is not assigned to any community yet" });
    }
    
    const complaint = new Complaint({
      userId: userId,
      subject,
      description,
      communityId: communityId,
    });
    await complaint.save();
    res.status(201).json({ message: "Complaint submitted", complaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Track (view) all complaints by a resident
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update complaint status (for admin)
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.status = status;
    complaint.updatedAt = new Date();
    await complaint.save();

    res.status(200).json({ message: "Complaint status updated", complaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
