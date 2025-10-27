const Payment = require('../../models/Payment');

exports.getPayments = async (req, res) => {
  try {
    console.log('✅ Logged-in User from protect middleware =>', req.user);

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!req.user.community) {
      return res.status(400).json({ message: "HOA Admin is not assigned to any community" });
    }
    const payments = await Payment.find({ community: req.user.community }).populate('user', 'name email');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payments', error: err.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findOneAndUpdate(
      { _id: req.params.id, community: req.user.community },
      req.body,
      { new: true }
    );
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Error updating payment', error: err.message });
  }
};