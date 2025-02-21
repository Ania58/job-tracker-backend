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
app.use(
  cors({
      origin: process.env.CLIENT_URL, 
      credentials: true, 
      methods: "GET,POST,PATCH,DELETE",
      allowedHeaders: ["Content-Type", "Authorization"],  
  })
);
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: /*process.env.NODE_ENV === "production",*/ false,
        httpOnly: true,
        sameSite: "none",
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