const mongoose = require('mongoose');

const accessActivity = new mongoose.Schema({
  //   enrolleeID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'ENROLLEE'
  // },
  // agentID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'AGENT'
  // },
  enrolleeId: { type: String, required: true },
  // accessInCount: { type: Number, default: 0 },
  // accessOutCount: { type: Number, default: 0 },
  // denyCount: { type: Number, default: 0 },
  // grantedBy: { type: String },

    grantedIn: [{
    grantedBy: { type: String },
    dateTime: { type: Date, default: Date.now }
  }],
  grantedOut: [{
    grantedBy: { type: String },
    dateTime: { type: Date, default: Date.now }
  }],
  denied: [{
    grantedBy: { type: String },
    dateTime: { type: Date, default: Date.now }
  }]
},{
    timestamps: true
});

module.exports = mongoose.model('ACCESS', accessActivity);