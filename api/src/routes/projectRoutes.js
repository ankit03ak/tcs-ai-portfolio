const express = require("express");
const { body } = require("express-validator");
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

const router = express.Router();

const projectValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("slug").notEmpty().withMessage("Slug is required"),
  body("shortDescription").notEmpty().withMessage("Short description is required")
];

router.get("/", getProjects);

router.get("/:id", getProjectById);

router.post("/", projectValidation, createProject);

router.put("/:id", projectValidation, updateProject);

router.delete("/:id", deleteProject);

module.exports = router;
