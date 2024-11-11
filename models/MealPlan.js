const mongoose = require("mongoose");

const meanPlanSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
    },  
    day1: {
      breakfast: { type: String },
      lunch: { type: String },
      dinner: { type: String },
    },
    day2: {
      breakfast: { type: String },
      lunch: { type: String },
      dinner: { type: String },
    },
    day3: {
      breakfast: { type: String },
      lunch: { type: String },
      dinner: { type: String },
    },
    day4: {
      breakfast: { type: String },
      lunch: { type: String },
      dinner: { type: String },
    },
    day5: {
      breakfast: { type: String },
      lunch: { type: String },
      dinner: { type: String },
    },
    day6: {
      breakfast: { type: String },
      lunch: { type: String },
      dinner: { type: String },
    },
    day7: {
      breakfast: { type: String },
      lunch: { type: String },
      dinner: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MealPlan", meanPlanSchema);
