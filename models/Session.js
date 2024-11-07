const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Client"
    },
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tutor"
    },
    title: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    sessionDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    sessionDuration: {
      type: Number,
      required: false,
    },
    meetingLink: {
      type: String,
      required: false,
    },
    meetingPassword: {
      type: String,
      required: false,
    },
    meetingStarted: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: 'Active'
    },
  },
  {
    timestamps: true,
  }
);


const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
