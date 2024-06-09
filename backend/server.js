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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Set reasonable cookie expiry (e.g., 7 days)
const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
app.use(express.cookieParser({
  maxAge: oneWeek,
  sameSite: 'lax',
}));

// Reduce the number of cookies sent with each request
app.use((req, res, next) => {
  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(';');
    if (cookies.length > 5) {
      res.setHeader('Set-Cookie', 'max-age=0'); // Clear cookies if more than 5 are present
    }
  }
  next();
});

console.log('Connecting to MongoDB...');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

console.log('Setting up frontend routes...');
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
