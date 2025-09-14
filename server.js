const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const { config, validateConfig } = require('./src/config');
const { connectDB, setupDatabaseEvents } = require('./src/config/database');
const routes = require('./src/routes');
const { errorHandler, notFoundHandler } = require('./src/middleware/errorHandler');
const dataInitializer = require('./src/services/dataInitializer');

validateConfig();

const app = express();

app.use(cors());
app.use(express.json({ limit: config.upload.maxFileSize }));
app.use(express.urlencoded({ extended: true, limit: config.upload.maxFileSize }));

// API routes - Only progress routes
app.use(routes);

// Serve progress dashboard as the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'progress-dashboard.html'));
});

app.get('/progress-dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'progress-dashboard.html'));
});

// Static files (CSS, JS, images)
app.use(express.static('public', {
  index: false,
}));

app.use(errorHandler);
app.use('*', notFoundHandler);

const gracefulShutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);
  await mongoose.connection.close();
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

const startServer = async () => {
  try {
    const db = await connectDB();
    setupDatabaseEvents(db.connection);

    await dataInitializer.initializeData();

    const server = app.listen(config.server.port, () => {
      console.log(`🚀 POSM Progress Dashboard running on port ${config.server.port}`);
      console.log(`📊 Environment: ${config.server.nodeEnv}`);
      console.log(`🌐 Dashboard URL: http://localhost:${config.server.port}`);
    });

    server.on('error', (error) => {
      console.error('Server error:', error);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();