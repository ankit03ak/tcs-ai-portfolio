const { validationResult } = require("express-validator");
const Project = require("../models/Project");
const asyncHandler = require("../utils/asyncHandler");


const getProjects = asyncHandler(async (req, res) => {
  const { featured } = req.query;

  const filter = {};
  if (featured === "true") {
    filter.featured = true;
  }

  const projects = await Project.find(filter).sort({ sortOrder: 1, createdAt: -1 });
  res.json(projects);
});


const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.json(project);
});

const createProject = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array().map((e) => e.msg).join(", "));
  }

  const project = await Project.create(req.body);
  res.status(201).json(project);
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  Object.assign(project, req.body);
  const updated = await project.save();
  res.json(updated);
});


const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  await project.deleteOne();
  res.json({ message: "Project removed" });
});

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
