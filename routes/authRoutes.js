const express = require("express");
const passport = require("passport");
const { registerUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);