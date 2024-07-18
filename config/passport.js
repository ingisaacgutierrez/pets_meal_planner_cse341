const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const passport = require('passport');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = mongodb.getDb().db('Pets_Meal_Planner');
    const userCollection = db.collection('user');
    const user = await userCollection.findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if user already exists in db
      try {
        const db = mongodb.getDb().db('Pets_Meal_Planner');
        const userCollection = db.collection('user');

        const currentUser = await userCollection.findOne({ googleId: profile.id });
        if (currentUser) {
          console.log('User is: ', currentUser);
          done(null, currentUser);
        } else {
          const newUser = {
            googleId: profile.id,
            displayName: profile.displayName
          };
          const result = await userCollection.insertOne(newUser);
          console.log('Created new user: ', result.ops[0]);
          done(null, result.ops[0]);
        }
      } catch (err) {
        console.error('Error in Google Stradegy: ', err);
        done(err, null);
      }
    }
  )
);

module.exports = passport;
