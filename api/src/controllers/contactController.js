const { validationResult } = require("express-validator");
const Message = require("../models/Message");
const asyncHandler = require("../utils/asyncHandler");


const submitMessage = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array().map((e) => e.msg).join(", "));
  }

  const { name, email, subject, message } = req.body;

  const saved = await Message.create({
    name,
    email,
    subject,
    message,
    meta: {
      userAgent: req.headers["user-agent"],
      ip: req.ip
    }
  });

  res.status(201).json({
    message: "Message received successfully",
    data: saved
  });
});

module.exports = { submitMessage };
