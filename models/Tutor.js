const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },

    payRate: {
      type: Number,
      required: false,
      default: 1,
    },
    imgUrl: {
      type: String,
      required: false,
    },
    roles: [
      {
        type: String,
        default: "Tutor",
      },
    ],
    subjects: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: "Active",
    },
    rating: {
      type: Number,
      default: 5,
    },

    refreshToken: String,
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tutor", userSchema);
