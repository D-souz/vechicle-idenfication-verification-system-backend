const express = require('express');
const router = express.Router();
const { qrcodesDownloaded, scansCount, qrcodesGenerated, accessIn, accessOut ,denyAccess, access, agentScansCount, getAccessDetails } = require('../controllers/qrcodeStatsController');
const protectRoutes = require("../middleware/authMiddleware");

// protecting the api routes
router.use(protectRoutes);

// saves the agent's id with the qrcode that is being downloaded
router.patch('/download/:id', qrcodesDownloaded)

// get generated qr codes
router.patch('/generated/:id', qrcodesGenerated);

// get no of scanned qr codes by agent
router.patch('/scans/:id', scansCount);

// get agents with scans
router.get('/agent-scans', agentScansCount);

// getting the number of enrollee grantted access in by an agent
router.post('/grantInAccess/:id', accessIn);

// getting the number of enrollee grantted access out by an agent
router.post('/grantOutAccess/:id', accessOut);

// getting the number of enrollee grantted access out by an agent
router.post('/denyAccess/:id', denyAccess);

// getting the access counts for an enrollee
router.get('/access/:id', access);

// getting the access details for an enrollee
router.get('/access-details/:id', getAccessDetails);

module.exports = router;