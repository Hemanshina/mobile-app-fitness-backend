const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    noOfMonths: {
      type: Number,
      default: 1,
    },
    recommended: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    points: {
      type: String,
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
    deletedById: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
