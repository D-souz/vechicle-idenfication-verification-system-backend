const express = require('express');
const router = express.Router();
const { registerAgent, loginAgent, getAgents, getSingleAgent, updateAgent, deleteAgent } = require('../controllers/agentController');
const protectRoutes = require("../middleware/authMiddleware");
const upload = require('../middleware/multerMiddleware');

// creating the agents routes

// creating / sigining up a new agent
router.post('/register', registerAgent);

// logining in an agent
router.post('/login', loginAgent)

// protecting the api routes
router.use(protectRoutes);

// fetching all agents
router.get('/agents', getAgents)

// getting a single agent
router.get('/:id', getSingleAgent)

// updating an agent
router.patch('/:id', upload.single('profileImage'), updateAgent)

// deleting an agent
router.delete('/:id', deleteAgent)

module.exports = router;