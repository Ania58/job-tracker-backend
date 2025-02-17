const express = require("express");
const router = express.Router();
const { createAJob } = require("../controllers/jobTrackController");

router.post("/jobs", createAJob);






module.exports = router;