const express = require("express");
const router = express.Router();
const { createAJob, retriveJobs } = require("../controllers/jobTrackController");

router.post("/jobs", createAJob);
router.get("/jobs", retriveJobs);






module.exports = router;