const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
    enrolleeID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ENROLLEE'
  },
  agentID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'AGENT'
  },
  accessType: String,
  // accessInCount: { type: Number, default: 0 },
  // accessOutCount: { type: Number, default: 0 },
  // denyCount: { type: Number, default: 0 },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('ACCESSLOG', accessLogSchema);