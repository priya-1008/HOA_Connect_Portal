const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  transactionId: { type: String, maxlength: 100 },
  communityId: { type: mongoose.Schema.Types.ObjectId, required: "Community" }, // Links to Community.communityId
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Resident who made the payment
}, { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model('Payment', PaymentSchema);