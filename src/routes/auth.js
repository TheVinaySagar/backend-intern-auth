const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Generate JWT token
const generateJWT = (user) => {
  return jwt.sign(
    { 
      userId: user._id,
      email: user.email,
      name: user.name
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// GET /auth/google - Initiate Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// GET /auth/google/callback - Handle Google OAuth callback
router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    try {
      // Generate JWT token
      const token = generateJWT(req.user);
      
      // Successful authentication
      res.json({
        success: true,
        message: 'Authentication successful',
        user: {
          id: req.user._id,
          email: req.user.email,
          name: req.user.name
        },
        token: token
      });
    } catch (error) {
      console.error('Callback error:', error);
      res.status(500).json({
        success: false,
        error: 'Authentication failed',
        message: 'Unable to generate access token'
      });
    }
  }
);

module.exports = router;
