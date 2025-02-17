const express = require("express");
const router = express.Router();
const { createAJob, retriveJobs, retriveAParticularJob, updateAJob, deleteAJob } = require("../controllers/jobTrackController");

router.post("/jobs", createAJob);
router.get("/jobs", retriveJobs);
router.get("/jobs/:id", retriveAParticularJob);
router.patch("/jobs/:id", updateAJob);
router.delete("/jobs/:id", deleteAJob);






module.exports = router;