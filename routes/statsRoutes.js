const express = require('express');
const router = express.Router();
const { grantAccessIn, denyAccess, grantAccessOut, allStats, enrolleeStats } = require('../controllers/statsController');
const protectRoutes = require("../middleware/authMiddleware");

// protecting the api routes
router.use(protectRoutes);

// grant access in
router.post('/grant-in/:id', grantAccessIn);

// deny access
router.post('/deny-access/:id', denyAccess);

// grant access out
router.post('/grant-out/:id', grantAccessOut);

// get all access statistics
router.get('/stats', allStats);

// get enrollee statistics
router.get('/stats/:id', enrolleeStats);

module.exports = router;