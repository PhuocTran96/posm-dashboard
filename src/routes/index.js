const express = require('express');
const progressRoutes = require('./progressRoutes');

const router = express.Router();

// Progress tracking routes - Only route needed for progress dashboard
router.use('/api/progress', progressRoutes);

module.exports = router;