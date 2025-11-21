const express = require("express");
const { body } = require("express-validator");
const {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification
} = require("../controllers/certificationController");

const router = express.Router();

const certificationValidation = [
  body("name").notEmpty().withMessage("Certification name is required"),
  body("issuer").notEmpty().withMessage("Issuer is required"),
  body("issueDate").notEmpty().withMessage("Issue date is required")
];

router.get("/", getCertifications);

router.post("/", certificationValidation, createCertification);

router.put("/:id", certificationValidation, updateCertification);

router.delete("/:id", deleteCertification);

module.exports = router;
