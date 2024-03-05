// const mongoose = require('mongoose');

// // creating schema
// const notificationSchema = new mongoose.Schema({
//     enrolleeID: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'ENROLLEE'
//       },
//       agentID: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'AGENT'
//       },
//       title: {
//         type: String
//       },
//       message: {
//         type: String
//       },
//       timestamp: {
//         type: Date,
//         default: Date.now,
//       },
// })
// module.exports = mongoose.model('NOTIFICATION', notificationSchema);