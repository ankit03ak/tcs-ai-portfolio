const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true
    },
    fullDescription: {
      type: String,
      trim: true
    },
    techStack: [
      {
        type: String,
        trim: true
      }
    ],
    role: {
      type: String,
      trim: true
    },
    timeline: {
      type: String,
      trim: true
    },
    githubUrl: {
      type: String,
      trim: true
    },
    liveUrl: {
      type: String,
      trim: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    sortOrder: {
      type: Number,
      default: 0
    },
    highlightPoints: [
      {
        type: String,
        trim: true
      }
    ],
    tags: [
      {
        type: String,
        trim: true
      }
    ]
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
