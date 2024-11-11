const express = require("express");
const router = express.Router();
const progressLogController = require("../controllers/ProgressLogController");

router.post("/", progressLogController.createLog);
router.get("/client-logs/:clientId", progressLogController.getClientLogs);

module.exports = router;
