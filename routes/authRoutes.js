const express = require("express");
const passport = require("passport");
const { registerUser, loginUser, googleAuth, googleCallback, googleSuccess, logoutUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", passport.authenticate("local"), loginUser);
router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleCallback, googleSuccess);
router.get("/logout", logoutUser);

module.exports = router;