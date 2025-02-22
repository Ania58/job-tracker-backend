const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");

require("dotenv").config();

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const authRoutes = require("./routes/authRoutes"); 
require("./config/passport");

const jobRoutes = require("./routes/jobTrackRoutes"); 

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  cors({
      origin: process.env.CLIENT_URL, 
      credentials: true, 
      methods: "GET,POST,PATCH,DELETE",
      allowedHeaders: ["Content-Type", "Authorization"],  
  })
);

app.set("trust proxy", 1);
app.use(
    session({
      store: new pgSession({
        pool: db, 
        tableName: "session",
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
    },
    })
  );

app.use(passport.initialize());
app.use(passport.session());
app.use("/", jobRoutes);
app.use("/auth", authRoutes);














app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
})