const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");
const { upload } = require("../helpers/fileHelper");

router
  .post("/login", loginLimiter, authController.login)
  .get("/refresh/:userType/:userId", authController.refresh)
  .post("/logout", authController.logout)
  .patch(
    "/update-profile/:userType/:userId",
    upload.single("file"),
    authController.updateProfilePicture
  )
  .patch("/update-status", authController.updateUserStatus)
  .patch("/change-password", authController.changePassword);

module.exports = router;
