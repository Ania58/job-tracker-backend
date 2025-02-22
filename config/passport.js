const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const bcrypt = require("bcrypt");
const db = require("../config/db"); 

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

      if (result.rows.length === 0) {
        return done(null, false, { message: "User not found" });
      }

      const user = result.rows[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

/*passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user;
        const result = await db.query("SELECT * FROM users WHERE google_id = $1", [profile.id]);

        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email, google_id) VALUES ($1, $2) RETURNING *",
            [profile.email, profile.id]
          );
          user = newUser.rows[0];
        } else {
          user = result.rows[0];
        }
        req.login(user, (err) => {
          if (err) return done(err);
          return done(null, user);
        });

      } catch (err) {
        return done(err);
      }
    }
  )
);*/

passport.use(
  new GoogleStrategy(
      {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
          try {
              const result = await db.query("SELECT * FROM users WHERE google_id = $1", [profile.id]);

              if (result.rows.length === 0) {
                  const newUser = await db.query(
                      "INSERT INTO users (email, google_id) VALUES ($1, $2) RETURNING *",
                      [profile.email, profile.id]
                  );
                  return done(null, newUser.rows[0]);
              }

              return done(null, result.rows[0]);
          } catch (err) {
              return done(err);
          }
      }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});