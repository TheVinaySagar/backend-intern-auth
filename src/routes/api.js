const express = require('express');
const { verifyJWT } = require('../middleware/auth');
const router = express.Router();

// Sample posts data
const samplePosts = [
  {
    post_id: 1,
    title: 'Understanding Constitutional Law in India',
    contentSnippet: 'Constitutional law forms the foundation of legal system in India. This article explores the fundamental principles...'
  },
  {
    post_id: 2,
    title: 'Corporate Law Essentials for Startups',
    contentSnippet: 'Starting a business requires understanding various legal compliance requirements. Here\'s a comprehensive guide...'
  },
  {
    post_id: 3,
    title: 'Intellectual Property Rights in Digital Age',
    contentSnippet: 'With the rise of digital technologies, protecting intellectual property has become more challenging...'
  }
];

// GET /api/posts - Protected endpoint to get posts
router.get('/posts', verifyJWT, (req, res) => {
  try {
    res.json({
      success: true,
      data: samplePosts
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Unable to retrieve posts'
    });
  }
});

module.exports = router;
