const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
  enrolleeID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ENROLLEE'
  },
  accessType: {
    type: String,
    enum: ['grant-in', 'deny', 'grant-out'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('ACCESSLOG', accessLogSchema);