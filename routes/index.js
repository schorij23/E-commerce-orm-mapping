// Import Express Router and API routes
const router = require('express').Router();
const apiRoutes = require('./api');
// Use '/api' for all api routes
router.use('/api', apiRoutes);
// Middleware for non api routes
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;