const MealPlan = require("../models/MealPlan");

const createMealPlan = async (req, res) => {
  try {
    const newMealPlan = new MealPlan(req.body);

    // Save the meal plan to the database
    const savedMealPlan = await newMealPlan.save();

    // Respond with the saved meal plan and a success message
    res.status(201).json({
      message: "Meal plan created successfully",
    });
  } catch (error) {
    // Handle any errors during creation and saving process
    res.status(500).json({
      message: "Error creating meal plan",
      error: error.message,
    });
  }
};

const getallMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find();

    if (!mealPlans.length) {
      return res.status(200).json({
        message: "No meal plans added yet",
      });
    }

    res.status(200).json({
      plans: mealPlans,
    });
  } catch (error) {
    // Handle any errors during the fetch process
    res.status(500).json({
      message: "Error retrieving meal plans",
      error: error.message,
    });
  }
};

const getOneMealPlanById = async (req, res) => {
  try {
    const { mealPlanId } = req.params;

    const mealPlan = await MealPlan.findById(mealPlanId);

    if (!mealPlan) {
      return res.status(404).json({
        message: "Meal plan not found",
      });
    }

    res.status(200).json({
      plan: mealPlan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving meal plan",
      error: error.message,
    });
  }
};

module.exports = {
  createMealPlan,
  getallMealPlans,
  getOneMealPlanById,
};
