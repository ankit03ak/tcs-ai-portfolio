
const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true
    },
    totalVisits: {
      type: Number,
      default: 0
    },
    lastVisitAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports = Analytics;
