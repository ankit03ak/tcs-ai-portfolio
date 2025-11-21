const express = require("express");
const { body } = require("express-validator");
const { chatWithPersona } = require("../controllers/chatController");

const router = express.Router();

const chatValidation = [
  body("messages")
    .isArray({ min: 1 })
    .withMessage("messages must be a non-empty array"),
  body("messages.*.role")
    .isIn(["user", "assistant"])
    .withMessage("Each message.role must be 'user' or 'assistant'"),
  body("messages.*.content")
    .isString()
    .notEmpty()
    .withMessage("Each message.content must be a non-empty string"),
  body("mode")
    .optional()
    .isString()
];

router.post("/", chatValidation, chatWithPersona);

module.exports = router;
