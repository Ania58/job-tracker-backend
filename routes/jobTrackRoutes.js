const express = require("express");
const router = express.Router();
const { createAJob, retriveJobs, retriveAParticularJob, updateAJob, deleteAJob } = require("../controllers/jobTrackController");
const requireAuth = require("../middleware/authMiddleware");

router.post("/jobs",  requireAuth, createAJob);
router.get("/jobs",  requireAuth, retriveJobs);
router.get("/jobs/:id", retriveAParticularJob);
router.patch("/jobs/:id", updateAJob);
router.delete("/jobs/:id", deleteAJob);






module.exports = router;