const mongoose = require("mongoose");

const userSubscription = new mongoose.Schema(
  {
    expiryDate: {
      type: Date,
      required: true,
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subscription",
    },
    isDeleted: { type: Boolean, default: false },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Client",
    },
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

module.exports = mongoose.model("ClientSubscription", userSubscription);
