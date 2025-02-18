const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const session = require("express-session");
const db = require("../config/db");
const dotenv = require("dotenv");

const router = express.Router();
const saltRounds = 10;

dotenv.config();

router.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

router.use(passport.initialize());
router.use(passport.session());
