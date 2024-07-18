const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', { user: req.user });
});

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/auth');
  }
);

// @desc    Logout User
// @route   GET /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect('/auth');
  });
});

module.exports = router;
