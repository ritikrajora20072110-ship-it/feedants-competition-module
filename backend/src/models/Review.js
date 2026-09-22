const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    userAvatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    commentHi: {
      type: String,
      trim: true,
    },
    competitionCategory: {
      type: String,
      default: 'Classical Dance',
    },
    badge: {
      type: String,
      default: 'Verified Winner',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', ReviewSchema);
