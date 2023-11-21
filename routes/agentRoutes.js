const express = require('express');
const router = express.Router();
const { registerAgent, loginAgent, getAgents, getSingleAgent, updateAgent, deleteAgent } = require('../controllers/agentController');

// creating the agents rouutes

// creating / sigining up a new agent
router.post('/register', registerAgent);

// logining in an agent
router.post('/login', loginAgent)

// fetching all agents
router.get('/agents', getAgents)

// getting a single agent
router.get('/:id', getSingleAgent)

// updating an agent
router.patch('/:id', updateAgent)

// deleting an agent
router.delete('/:id', deleteAgent)

module.exports = router;