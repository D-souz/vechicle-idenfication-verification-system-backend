const express = require('express');
const router = express.Router();
const { registerEnrollee, getEnrollees, getSingleEnrollee, updateEnrollee, deleteEnrollee } = require('../controllers/enrolleeController');

// creating / sigining up a new enrollee
router.post('/register', registerEnrollee);

// fetching all enrollees
router.get('/enrollees', getEnrollees);

// getting a single enrollee
router.get('/:id', getSingleEnrollee);

// updating an enrollee
router.patch('/:id', updateEnrollee);

// deleting an enrollee
router.delete('/:id', deleteEnrollee);

module.exports = router;