const mongoose = require("mongoose");

const clientPaymentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: false,
    },
    transactionCode: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
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

module.exports = mongoose.model("ClientPayment", clientPaymentSchema);
