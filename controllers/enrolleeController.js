const ENROLLEE = require('../models/enrolleeModel');


// @desc   Registering a new enrollee
// @route  POST /api/enrollee/register
// @acess  public
const registerEnrollee = async (req, res) => {

    
    res.json({ message: "enrollee registered"});
}

// @desc   Get enrollees
// @route  GET /api/enrollee/enrollees
// @acess  private
const getEnrollees = async (req, res) => {
    res.json({ message: "enrollees fetched"});
}

// @desc   Get a single enrollee
// @route  GET /api/enrollee/:id
// @acess  private
const getSingleEnrollee = async (req, res) => {
    res.json({ message: "single enrollee"});
}

// @desc   Updating a particular enrollee
// @route  PUT /api/enrollee/:id
// @acess  private
const updateEnrollee = async (req, res) => {
    res.json({ message: "enrollee updated"});
}

// @desc    Delete a particular enrollee
// @route  DELETE /api/enrollee/:id
// @acess  private
const deleteEnrollee = async (req, res) => {
    res.json({ message: "enrollee deleted"});
}

module.exports = {
    registerEnrollee,
    getEnrollees,
    getSingleEnrollee,
    updateEnrollee,
    deleteEnrollee
}