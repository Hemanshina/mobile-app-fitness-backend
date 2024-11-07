const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .get("/student/account/:userId", userController.getuserById)
  .post("/client", userController.registerClient)
  .patch("/update/profile", userController.editProfile)
  .patch("/update/user-status", userController.updateUserStatus)
  .delete("/delete/:userType/:userId", userController.deleteUser);

module.exports = router;
