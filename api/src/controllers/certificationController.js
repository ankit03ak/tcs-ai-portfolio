const { validationResult } = require("express-validator");
const Certification = require("../models/Certification");
const asyncHandler = require("../utils/asyncHandler");


const getCertifications = asyncHandler(async (req, res) => {
  const certifications = await Certification.find().sort({ sortOrder: 1, issueDate: -1 });
  res.json(certifications);
});


const createCertification = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array().map((e) => e.msg).join(", "));
  }

  const cert = await Certification.create(req.body);
  res.status(201).json(cert);
});

const updateCertification = asyncHandler(async (req, res) => {
  const cert = await Certification.findById(req.params.id);

  if (!cert) {
    res.status(404);
    throw new Error("Certification not found");
  }

  Object.assign(cert, req.body);
  const updated = await cert.save();
  res.json(updated);
});

const deleteCertification = asyncHandler(async (req, res) => {
  const cert = await Certification.findById(req.params.id);

  if (!cert) {
    res.status(404);
    throw new Error("Certification not found");
  }

  await cert.deleteOne();
  res.json({ message: "Certification removed" });
});

module.exports = {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification
};
