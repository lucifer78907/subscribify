const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");
// add server side validation

router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail().normalizeEmail(),
    body("password", "Please enter a password of atleast 7 chars")
      .trim()
      .isLength({ min: 7 }),
  ],
  authController.login
);

router.post(
  "/signup",
  [
    body("email", "Please enter a valid email").isEmail().normalizeEmail(),
    body("password", "Please enter a password of atleast 7 chars")
      .trim()
      .isLength({ min: 7 }),
    body("name", "Please enter a name of atleast 7 chars")
      .trim()
      .isLength({ min: 7 }),
  ],

  authController.signUp
);

module.exports = router;
