const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
    enrolleeID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ENROLLEE'
  },
  accessType: String,
  accessInCount: { type: Number, default: 0 },
  accessOutCount: { type: Number, default: 0 },
  denyCount: { type: Number, default: 0 },

}, { timestamps: true});

module.exports = mongoose.model('ACCESSLOG', accessLogSchema);