
const asyncHandler = require("../utils/asyncHandler");
const Analytics = require("../models/Analytics");


const trackVisit = asyncHandler(async (req, res) => {
  const key = "portfolio";

  const update = {
    $inc: { totalVisits: 1 },
    $set: { lastVisitAt: new Date() }
  };

  const options = {
    new: true,
    upsert: true
  };

  const doc = await Analytics.findOneAndUpdate({ key }, update, options);

  res.json({
    totalVisits: doc.totalVisits,
    lastVisitAt: doc.lastVisitAt
  });
});

const getAnalytics = asyncHandler(async (req, res) => {
  const key = "portfolio";
  const doc = await Analytics.findOne({ key });

  if (!doc) {
    return res.json({
      totalVisits: 0,
      lastVisitAt: null
    });
  }

  res.json({
    totalVisits: doc.totalVisits,
    lastVisitAt: doc.lastVisitAt
  });
});

module.exports = { trackVisit, getAnalytics };
