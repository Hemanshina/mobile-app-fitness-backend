const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
   
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
        default: "Client",
      },
    ],
    imgUrl: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: "Active",
    },
    isEmailVerified: { type: Boolean, default: false },

    refreshToken: String,
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", userSchema);
