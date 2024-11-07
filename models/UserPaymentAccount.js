const mongoose = require("mongoose");

const studentAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    stripeCode: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);



const UserPaymentAccount = mongoose.model("UserPaymentAccount", studentAccountSchema);

module.exports = UserPaymentAccount;
