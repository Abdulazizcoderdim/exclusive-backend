const passport = require('passport');
const UserGoogle = require('../models/google.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const passportConfig = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: `${process.env.API_URL}/api/auth/google/callback`,
        scope: ['profile', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('profile', profile);
        try {
          console.log('Google Profile: ', profile);
          let user = await UserGoogle.findOne({
            googleId: profile.id,
            // email: profile.emails[0].value,
          });

          if (!user) {
            user = await UserGoogle.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              image: profile.photos[0].value,
            });
          }

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserGoogle.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

module.exports = passportConfig;
