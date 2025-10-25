// const Payment = require("../models/Payment");

// exports.getAllPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find()
//       .populate("communityId", "name")
//       .populate("userId", "name email");
//     res.status(200).json({ success: true, data: payments });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getCommunityPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find({ community: req.user.community }).populate("resident", "name email");
//     res.json(payments);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.updatePaymentStatus = async (req, res) => {
//   try {
//     const payment = await Payment.findById(req.params.id);
//     if (!payment) return res.status(404).json({ message: "Payment not found" });

//     payment.status = req.body.status || payment.status;
//     await payment.save();

//     res.json(payment);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

const Payment = require('../models/Payment');

// ---------------- CREATE PAYMENT ----------------
exports.createPayment = async (req, res) => {
    try {
        const { amount, userId, communityId, description } = req.body;

        const payment = new Payment({ amount, userId, community: communityId, description });
        await payment.save();

        res.status(201).json({ message: 'Payment recorded', payment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// ---------------- GET PAYMENTS FOR COMMUNITY ----------------
exports.getCommunityPayments = async (req, res) => {
    try {
        const { communityId } = req.params;
        const payments = await Payment.find({ community: communityId }).populate('userId', 'name email');

        res.status(200).json({ payments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// ---------------- GET ALL PAYMENTS ----------------
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('userId', 'name email').populate('community', 'name address');
        res.status(200).json({ payments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};