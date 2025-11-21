const express = require("express");
const { body } = require("express-validator");
const { submitMessage } = require("../controllers/contactController");

const router = express.Router();

const contactValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("message").notEmpty().withMessage("Message is required")
];

router.post("/", contactValidation, submitMessage);

module.exports = router;
