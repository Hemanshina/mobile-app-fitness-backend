const mongoose = require("mongoose");

const progressLog = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Client",
    },

    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("ProgressLog", progressLog);
