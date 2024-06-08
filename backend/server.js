const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Import routes
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parses JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded payloads
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
