const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    competitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Competition',
      required: true,
      index: true,
    },
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['CONFIRMED', 'PENDING', 'CANCELLED', 'REFUNDED'],
      default: 'CONFIRMED',
    },
    paymentGateway: {
      type: String,
      default: 'Razorpay',
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to guarantee one active registration per user per competition
RegistrationSchema.index({ userId: 1, competitionId: 1 }, { unique: true });

module.exports = mongoose.model('Registration', RegistrationSchema);
