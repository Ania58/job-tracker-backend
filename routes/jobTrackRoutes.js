const express = require("express");
const router = express.Router();
const { createAJob, retriveJobs, retriveAParticularJob, updateAJob } = require("../controllers/jobTrackController");

router.post("/jobs", createAJob);
router.get("/jobs", retriveJobs);
router.get("/jobs/:id", retriveAParticularJob);
router.patch("/jobs/:id", updateAJob)






module.exports = router;