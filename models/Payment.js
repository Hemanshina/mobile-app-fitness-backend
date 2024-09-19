const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Client"
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Session"
    },
    amount: {
      type: Number,
      required: true,
    },
    stripeCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.plugin(AutoIncrement, {
  inc_field: "transactionCode",
  id: "transactionCodes",
  start_seq: 17395271,
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
