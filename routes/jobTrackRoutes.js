const express = require("express");
const router = express.Router();
const { createAJob, retriveJobs, retriveAParticularJob } = require("../controllers/jobTrackController");

router.post("/jobs", createAJob);
router.get("/jobs", retriveJobs);
router.get("/jobs/:id", retriveAParticularJob)






module.exports = router;