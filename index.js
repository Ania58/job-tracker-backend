const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes"); 
require("./config/passport");

const jobRoutes = require("./routes/jobTrackRoutes"); 

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(passport.initialize());
app.use(passport.session());
app.use("/", jobRoutes);
app.use("/auth", authRoutes);














app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
})