const Notification = require("../models/Notification");
const User = require("../models/User");

exports.sendNotificationBySuperAdmin = async (req, res) => {
  try {
    const { title, message } = req.body;
    const users = await User.find({}, "_id");
    const notification = await Notification.create({
      title,
      message,
      recipients: users.map(u => u._id),
      createdBy: req.user.id,
    });
    res.status(201).json({ 
      success: true, 
      data: {
        id: notification._id,
        title: notification.title,
        message: notification.message,
        recipients: notification.recipients,
        createdBy: req.user.name || req.user.email,
        createdAt: notification.createdAt,
    }, });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllNotificationsBySuperAdmin = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.sendNotificationByAdmin = async (req, res) => {
  try {
    const { title, message } = req.body;

    const notification = await Notification.create({
      title,
      message,
      communityId: req.user.communityId,
      sender: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Notification sent successfully",
      data: {
        id: notification._id,
        title: notification.title,
        message: notification.message,
        communityId: notification.communityId,
        createdBy: req.user.name || req.user.email,
        createdAt: notification.createdAt,
      }, 
  });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getNotificationsByAdmin = async (req, res) => {
  try {
    const notifications = await Notification.find({ communityId: req.user.communityId });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};