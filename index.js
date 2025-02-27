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
const allowedOrigins = [
  "http://localhost:5137",  
   process.env.CLIENT_URL
];
app.use(
  cors({
      origin:  function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.error("Blocked by CORS:", origin);
          callback(new Error("CORS blocked this request"));
        }
      },
      credentials: true, 
      methods: "GET,POST,PATCH,DELETE",
      allowedHeaders: ["Content-Type", "Authorization"],  
  })
);

app.set("trust proxy", 1);
app.use(
    session({
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