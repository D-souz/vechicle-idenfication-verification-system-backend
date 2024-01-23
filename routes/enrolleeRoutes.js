const express = require('express');
const router = express.Router();
const { registerEnrollee, getEnrollees, getSingleEnrollee, updateEnrollee, deleteEnrollee } = require('../controllers/enrolleeController');
const protectRoutes = require("../middleware/authMiddleware");
const upload = require('../middleware/multerMiddleware');

// protecting the api routes
router.use(protectRoutes);

// creating / sigining up a new enrollee
router.post('/register', upload.single('image'), registerEnrollee);

// fetching all enrollees
router.get('/enrollees', getEnrollees);

// getting a single enrollee
router.get('/:id', getSingleEnrollee);

// updating an enrollee
router.patch('/:id', upload.single('image'), updateEnrollee);

// deleting an enrollee
router.delete('/:id', deleteEnrollee);

module.exports = router;