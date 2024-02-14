const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('MongoDB connection error:', error));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
