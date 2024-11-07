const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

router
  .post("/", subscriptionController.createSubscription)
  .post("/subscribe", subscriptionController.subscribe)
  .get("/", subscriptionController.getAllSubscriptions)
  .get("/one/:subscriptionId", subscriptionController.getSubscriptionById)
  .patch("/", subscriptionController.editSubscription)
  .delete("/:subscriptionId", subscriptionController.deleteSubscriptionById)


module.exports = router;