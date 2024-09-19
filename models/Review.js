const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    sessionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true },
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
    review: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;