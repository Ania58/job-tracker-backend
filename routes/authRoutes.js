const express = require("express");
const passport = require("passport");
const { registerUser, loginUser, getUser, googleAuth, googleCallback, googleSuccess, logoutUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", passport.authenticate("local"), loginUser);
router.get("/user", getUser);
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback, googleSuccess);
router.get("/logout", logoutUser);

module.exports = router;