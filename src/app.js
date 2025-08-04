const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes and configurations
require('./config/passport');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const { connectDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res,) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

app.listen(PORT, () => {
  console.log(`LawVriksh Auth Service running on port ${PORT}`);
});

module.exports = app;
