const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const PaymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    unique: true,
    default: () => uuidv4(), // automatically generate a UUID
  },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['Credit card', 'Debit Card', 'UPI', 'Cash'], required: true },
  transactionDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  transactionId: { type: String, maxlength: 100 },
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
}, { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model('Payment', PaymentSchema);