
const express = require("express");
const { trackVisit, getAnalytics } = require("../controllers/analyticsController");

const router = express.Router();


router.post("/visit", trackVisit);


router.get("/", getAnalytics);

module.exports = router;
