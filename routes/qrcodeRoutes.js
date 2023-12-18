const express = require('express');
const router = express.Router();
const protectRoutes = require("../middleware/authMiddleware");
const { generateQrcode, verifyQrcode } = require('../controllers/qrcodeContoller');

// protecting the api routes
router.use(protectRoutes);

// verifying qrcode
router.get('/verify', verifyQrcode);

// getting generated qrcode
router.get('/:id', generateQrcode);



module.exports = router;