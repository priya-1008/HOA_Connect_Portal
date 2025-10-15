const Announcement = require("../models/Announcement");

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.user?.communityId) {
      return res.status(400).json({ message: "Admin must belong to a community" });
    }

    const announcement = await Announcement.create({
      title,
      description,
      communityId: req.user.communityId,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Announcement created", announcement });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    if (!req.user?.communityId) {
      return res.status(400).json({ message: "Community not found in user" });
    }

    const announcements = await Announcement.find({ communityId: req.user.communityId })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};