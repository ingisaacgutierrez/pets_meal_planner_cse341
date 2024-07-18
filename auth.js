// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const jwt = require('jsonwebtoken');

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const JWT_SECRET = process.env.JWT_SECRET;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: CLIENT_ID,
//       clientSecret: CLIENT_SECRET,
//       callbackURL: 'http://localhost:3030/auth/google/callback'
//     },
//     function (token, tokenSecret, profile, done) {
//       const user = {
//         id: profile.id,
//         name: profile.displayName,
//         email: profile.emails[0].value
//       };

//       const jwtToken = jwt.sign(user, JWT_SECRET);

//       return done(null, { user, token: jwtToken });
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

// module.exports = passport;
