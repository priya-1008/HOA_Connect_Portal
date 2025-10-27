const Complaint = require('../../models/Complaint');

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ community: req.user.community }).populate('user', 'name email');
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching complaints', error: err.message });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findOneAndUpdate(
      { _id: id, community: req.user.community },
      req.body,
      { new: true }
    );
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json({ message: 'Complaint updated', complaint });
  } catch (err) {
    res.status(500).json({ message: 'Error updating complaint', error: err.message });
  }
};