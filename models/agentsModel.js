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
    },
    age: {
        type: Number,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    secretKey: {
        type: String
    },
    downloadsCount: { type: Number, default: 0 },
    generationsCount: { type: Number, default: 0 },
    scansCount: { type: Number, default: 0 },
}, { timestamps: true });

// creating the agent model
module.exports = mongoose.model('AGENT', agentSchema);