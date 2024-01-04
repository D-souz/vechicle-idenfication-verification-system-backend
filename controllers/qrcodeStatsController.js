const mongoose = require('mongoose');
const AGENT = require('../models/agentsModel');
const ENROLLEE = require('../models/enrolleeModel');
// const ACCESS = require('../models/accessModel')

// @desc   Saving downloaded qrcodes by agent
// @route  POST /api/qrcode-stats/download
// @acess  private
const qrcodesDownloaded = async (req, res) => {

  try {

    // getting agent's id
    const { id } = req.params;

    // checking if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).json({message: "No such agent found with that id!"});
    }

        // finding the logged in agent
        const agent = await AGENT.findById(id)

        // checking if the agent was found
        if (!agent) {
            return res.status(402).json({message: "Agent not found!"});
        }
    
        // Update the download count for the agent
        const updatedQRCode = await AGENT.findOneAndUpdate(
          {_id: id},
          { $inc: { downloadsCount: 1 } },
          { new: true }
        );
    
        return res.status(200).json({ downloads: updatedQRCode.downloadsCount});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

  }
  

  // @desc   Getting generated qrcodes by agent
  // @route  GET /api/qrcode-stats/generated/:id
  // @acess  private
  const qrcodesGenerated = async (req, res) => {
    // res.json({message: "genarated"})
    try {

      // getting agent's id
      const { id } = req.params;
  
      // checking if the id is valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(403).json({message: "No such agent found with that id!"});
      }
  
          // finding the logged in agent
          const agent = await AGENT.findById(id)
  
          // checking if the agent was found
          if (!agent) {
              return res.status(402).json({message: "Agent not found!"});
          }
      
          // Update the download count for the agent
          const updatedQRCode = await AGENT.findOneAndUpdate(
            {_id: id},
            { $inc: { generationsCount: 1 } },
            { new: true }
          );
      
          return res.status(200).json({ generated: updatedQRCode.generationsCount});
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

// @desc   Saving qrcodes scanned by agent
// @route  POST /api/qrcode-stats/scans/:id
// @acess  private
const scansCount = async (req, res) => {

  try {

    // getting agent's id
    const { id } = req.params;

    // checking if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).json({message: "No such agent found with that id!"});
    }

        // finding the logged in agent
        const agent = await AGENT.findById(id)

        // checking if the agent was found
        if (!agent) {
            return res.status(402).json({message: "Agent not found!"});
        }
    
        // // Update the download count for the agent
        const updatedQRCode = await AGENT.findOneAndUpdate(
          {_id: id},
          { $inc: { scansCount: 1 } },
          { new: true }
        );
    
        res.status(200).json({ scans: updatedQRCode.scansCount});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

  }
  
  // @desc   Getting enrollees grantted access in after scanning by an agent
  // @route  POST /api/qrcode-stats/grantInAccess/:id
  // @acess  private
  const accessIn = async (req, res) => {


     // getting the enrollee's id
     const { id } = req.params;
     const { grantedBy } = req.body;

      // checking if its a valid id
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).json("No such enrollee found with that id!")
    } 

    
  try {
    // Update granted in count and record the granter with date and time
    const updatedAccess = await ENROLLEE.findOneAndUpdate(
      {_id: id},
      { $push: { grantedIn: { grantedBy, dateTime: new Date() } } },
      { new: true }
    );

    return res.status(200).json(updatedAccess);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

  }

  // @desc   Getting enrollees grantted access in after scanning by an agent
  // @route  POST /api/qrcode-stats/grantOutAccess/:id
  // @acess  private
  const accessOut = async (req, res) => {


    // getting the enrollee's id
    const { id } = req.params;
    const { grantedBy } = req.body;

     // checking if its a valid id
     if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(403).json("No such enrollee found with that id!")
   } 

   
 try {
   // Update granted in count and record the granter with date and time
   const updatedAccess = await ENROLLEE.findOneAndUpdate(
     {_id: id},
     { $push: { grantedOut: { grantedBy, dateTime: new Date() } } },
     { new: true }
   );

   return res.status(200).json(updatedAccess);
 } catch (error) {
   console.error(error);
   return res.status(500).json({ message: 'Internal server error' });
 }

 }

   // @desc   Getting enrollees grantted access in after scanning by an agent
  // @route  POST /api/qrcode-stats/denyAccess/:id
  // @acess  private
  const denyAccess = async (req, res) => {


    // getting the enrollee's id
    const { id } = req.params;
    const { deniedBy } = req.body;

     // checking if its a valid id
     if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(403).json("No such enrollee found with that id!")
   } 

   
 try {
   // Update granted in count and record the granter with date and time
   const updatedAccess = await ENROLLEE.findOneAndUpdate(
     {_id: id},
     { $push: { denied: { deniedBy, dateTime: new Date() } } },
     { new: true }
   );

   return res.status(200).json(updatedAccess);
 } catch (error) {
   console.error(error);
   return res.status(500).json({ message: 'Internal server error' });
 }

 }

  // @desc   Getting all access counts for an enrollee
  // @route  GET /api/qrcode-stats/access/:id
  // @acess  private
const access = async (req, res) => {
  const { id } = req.params;

     // checking if its a valid id
     if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(403).json("No such enrollee found with that id!")
  } 

  try {

    const accessCounts = await ENROLLEE.findById(id)

    const grantedInCount = accessCounts.grantedIn.length;
    const grantedOutCount = accessCounts.grantedOut.length;
    const deniedCount = accessCounts.denied.length;

    const countResult = {
      grantedInCount,
      grantedOutCount,
      deniedCount
    };
    res.status(200).json(countResult)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

  // @desc   Getting agents with most scans
  // @route  GET /api/qrcode-stats/agent-scans
  // @acess  private
const agentScansCount = async (req, res) => {
  try {
    const recentScans = await AGENT.find()
      .sort({ scansCount: -1 }); // Sort in descending order of timestamp
      // .limit(10); // Retrieve the latest 10 scans (adjust the number as needed)

    // const recentUsers = recentScans.map(scan => scan.userId);

    res.status(200).json(recentScans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
  // @desc   Getting an enrollee access log 
  // @route  GET /api/qrcode-stats/access-details/:id
  // @acess  private
const getAccessDetails = async (req, res) => {
  // res.json("access details");
  const { id } = req.params;

}

  module.exports = {
    qrcodesDownloaded,
    scansCount,
    qrcodesGenerated,
    accessIn,
    accessOut,
    denyAccess,
    access,
    agentScansCount,
    getAccessDetails
}