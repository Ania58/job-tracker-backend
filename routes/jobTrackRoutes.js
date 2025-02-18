const express = require("express");
const router = express.Router();
const { createAJob, retriveJobs, retriveAParticularJob, updateAJob, deleteAJob } = require("../controllers/jobTrackController");
const requireAuth = require("../middlewares/authMiddleware");

router.post("/jobs", requireAuth, createAJob);
router.get("/jobs", requireAuth, retriveJobs);
router.get("/jobs/:id", requireAuth, retriveAParticularJob);
router.patch("/jobs/:id", requireAuth, updateAJob);
router.delete("/jobs/:id", requireAuth, deleteAJob);






module.exports = router;