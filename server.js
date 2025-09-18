require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoute');
const dashboardRoutes = require('./routes/dashboardRoute');

const app = express();
connectDB();

app.use(express.json());
// allow frontend origin (Vite default is 5173). Adjust if you use CRA (3000)
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Global error handler (simple)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));