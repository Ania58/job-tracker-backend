const bcrypt = require("bcrypt");
const db = require("../config/db");
const saltRounds = 10;
const passport = require("passport");

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hashedPassword]
        );

        req.login(newUser.rows[0], (err) => {
            if (err) throw err;
            res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const loginUser = (req, res) => {
    res.json({ message: "Login successful", user: req.user });
};

const getUser = (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ user: req.user });
    }
    res.status(401).json({ message: "Not authenticated" });
};

const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

const googleCallback = (req, res, next) => {
    passport.authenticate("google", (err, user) => {
        if (err || !user) {
            return res.redirect(`${process.env.CLIENT_URL}/login?error=true`);
        }
        req.login(user, (loginErr) => {
            if (loginErr) {
                return res.redirect(`${process.env.CLIENT_URL}/login?error=true`);
            }
            return res.redirect(`${process.env.CLIENT_URL}`);
        });
    })(req, res, next);
};

const googleSuccess = (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/auth/user`);
};

const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Session destruction failed" });
            }
            res.clearCookie("connect.sid", { path: "/", secure: true, sameSite: "none" });
            return res.json({ message: "Logged out successfully" });
        });
    });
};

module.exports = { registerUser, loginUser, getUser, googleAuth, googleCallback, googleSuccess, logoutUser };