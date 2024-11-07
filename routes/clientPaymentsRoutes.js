const express = require("express");
const router = express.Router();
const clientPaymentController = require("../controllers/clientPaymentController");

router
  .post("/webhook", clientPaymentController.stripeWebhook)
  .get("/transactions", clientPaymentController.getAllClientTransactions)


module.exports = router;
