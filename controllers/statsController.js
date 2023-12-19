const ENROLLEE = require('../models/enrolleeModel');
const ACCESSLOG = require('../models/statsModel')
const mongoose = require('mongoose');

// @desc   Grantting an Enrollee access in
// @route  POST /api/acess/grant-in/:id
// @acess  private
const grantAccessIn = async (req, res) => {

    // getting enrolless's id
    const { id } = req.params;

    // checking if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).json({message: "No such enrollee found with that id!"});
    }

    try {
        const accessLog = await ACCESSLOG.create({
            enrolleeID: id,
            accessType: 'grant-in',
          });
        return res.status(201).json({ message: 'Access granted in' });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to save access log' });
      }
    res.json({message: "access grantted!"})
}

// @desc   Denying an Enrollee access in
// @route  POST /api/acess/deny-access/:id
// @acess  private
const denyAccess = async (req, res) => {

     // getting enrolless's id
     const { id } = req.params;

     // checking if the id is valid
     if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(403).json({message: "No such enrollee found with that id!"});
     }
    
    try {
        const accessLog = await ACCESSLOG.create({
            enrolleeID: id,
            accessType: 'deny',
          });
        res.status(201).json({ message: 'Access denied' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to save access log' });
      }
}

// @desc   Grantting an Enrollee access out
// @route  POST /api/acess/grant-out/:id
// @acess  private
const grantAccessOut = async (req, res) => {

    // getting enrolless's id
    const { id } = req.params;

    // checking if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).json({message: "No such enrollee found with that id!"});
    }

    try {
        const accessLog = await ACCESSLOG.create({
            enrolleeID: id,
            accessType: 'grant-out',
          });
        res.status(201).json({ message: 'Access granted out' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to save access log' });
      }

}

// @desc   Getting Enrollees access stats
// @route  GET /api/acess/stats
// @acess  private
const allStats = async (req, res) => {
    try {
        const stats = await ACCESSLOG.aggregate([
          {
            $group: {
              _id: null,
              accessIn: { $sum: { $cond: [{ $eq: ['$accessType', 'grant-in'] }, 1, 0] } },
              denyAccess: { $sum: { $cond: [{ $eq: ['$accessType', 'deny'] }, 1, 0] } },
              accessOut: { $sum: { $cond: [{ $eq: ['$accessType', 'grant-out'] }, 1, 0] } },
              totalGrantedIn: { $sum: { $cond: [{ $eq: ['$accessType', 'grant-in'] }, 1, 0] } },
              totalGrantedOut: { $sum: { $cond: [{ $eq: ['$accessType', 'grant-out'] }, 1, 0] } },
              totalDenied: { $sum: { $cond: [{ $eq: ['$accessType', 'deny'] }, 1, 0] } },
              lastUpdated: { $max: '$timestamp' },
            },
          },
        ]);
    
        const accessStats = stats[0];
        accessStats.lastUpdated = accessStats.lastUpdated.toISOString();
    
        res.json(accessStats);
      } catch (error) {
        console.error('Failed to fetch access statistics:', error);
        res.status(500).json({ error: 'Failed to fetch access statistics' });
      }
}

// @desc   Getting an Enrollee access stats
// @route  GET /api/acess/stats/:id
// @acess  private
const enrolleeStats = async (req, res) => {
    const { id } = req.params;

    try {
      const stats = await ACCESSLOG.aggregate([
        {
          $match: {
            enrolleeID: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: null,
            accessIn: { $sum: { $cond: [{ $eq: ['$accessType', 'grant-in'] }, 1, 0] } },
            denyAccess: { $sum: { $cond: [{ $eq: ['$accessType', 'deny'] }, 1, 0] } },
            accessOut: { $sum: { $cond: [{ $eq: ['$accessType', 'grant-out'] }, 1, 0] } },
            totalGrantedIn: { $sum: { $cond: [{ $eq: ['$accessType', 'grant-in'] }, 1, 0] } },
            totalGrantedOut: { $sum: { $cond: [{ $eq: ['$accessType', 'grant-out'] }, 1, 0] } },
            totalDenied: { $sum: { $cond: [{ $eq: ['$accessType', 'deny'] }, 1, 0] } },
            lastUpdated: { $max: '$timestamp' },
          },
        },
      ]);
  
      if (stats.length === 0) {
        return res.status(404).json({ error: 'Access statistics not found' });
      }
  
      const accessStats = stats[0];
      accessStats.lastUpdated = accessStats.lastUpdated.toISOString();
  
      res.json(accessStats);
    } catch (error) {
      console.error('Failed to fetch access statistics:', error);
      res.status(500).json({ error: 'Failed to fetch access statistics' });
    }
}

module.exports = {
    grantAccessIn,
    denyAccess,
    grantAccessOut,
    allStats,
    enrolleeStats
}