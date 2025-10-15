const Payment = require("../models/Payment");

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("communityId", "name")
      .populate("userId", "name email");
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCommunityPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ community: req.user.community }).populate("resident", "name email");
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = req.body.status || payment.status;
    await payment.save();

    res.json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};