const mongoose = require('mongoose');

// creating agents schema
const agentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

// creating the agent model
module.exports = mongoose.model('AGENT', agentSchema);