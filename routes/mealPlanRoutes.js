const express = require("express");
const router = express.Router();
const mealPlan = require("../controllers/mealPlanController");

router.post("/", mealPlan.createMealPlan);
router.get("/", mealPlan.getallMealPlans);
router.get("/one/:mealPlanId", mealPlan.getOneMealPlanById);

module.exports = router;
