const ENROLLEE = require('../models/enrolleeModel');
// const AGENT = require('../models/agentsModel');
const mongoose = require('mongoose');
const validator = require('validator');
const path = require('path')

// @desc   Registering a new enrollee
// @route  POST /api/enrollee/register
// @acess  public
const registerEnrollee = async (req, res) => {
    
    // only the admin has the right to register new enrollee
    // getting the enrollee information
    const { 
        name,
        email,
        telephone,
        address,
        nin,
        vin,
        numberPlate,
        model,
        gender,
        age,
     } = req.body;
     
     const image = req.file.filename;
    try {

        // checking if all fleids where entered
    if (!name || ! email || !address || !address || !telephone || !vin || !numberPlate || !model) {
        return res.status(403).json({message: "Please fill in all feilds!"});
    }

    if (!validator.isEmail(email)) {
        return res.status(403).json({message:"Enter a valid email!"});
    }
    // **************************************************************

    // checking if the enrollee email already exists
    const emailExists = await ENROLLEE.findOne({email})
    if(emailExists) {
        return res.status(403).json({message: "The email is already exists!"});
    }   


        // getting the agent's id
        // const agentID = req.agent.id;
        const createEnrollee = await ENROLLEE.create({ 
            name,
            email,
            telephone,
            address,
            nin,
            vin,
            numberPlate,
            model,
            gender,
            age,
            image
         })
        console.log(createEnrollee);
        return res.status(200).json(createEnrollee);
    } catch (error) {
        console.log(error);
        return res.json({error: error.message})
    }
    
}

// @desc   Get enrollees
// @route  GET /api/enrollee/enrollees
// @acess  private
const getEnrollees = async (req, res) => {

    try {
        const enrollee = await ENROLLEE.find({}).sort({createdAt: -1})
        if (!enrollee) {
            return res.status(404).json({message: "no enrollee found!"});
        } else {
            return res.status(200).json(enrollee);
        }
    } catch (error) {
       console.log(error);
    }
}

// @desc   Get a single enrollee
// @route  GET /api/enrollee/:id
// @acess  private
const getSingleEnrollee = async (req, res) => {
         // getting enrolless's id
         const { id } = req.params;

         // checking if the id is valid
         if (!mongoose.Types.ObjectId.isValid(id)) {
             return res.status(403).json({message: "No such enrollee found with that id!"});
         }
         try {

             const enrollee = await ENROLLEE.findById(id)
     
             if (!enrollee) {
                 return res.status(403).json({message: 'no enrollee found!!'});
             } else {
                 return res.status(200).json(enrollee);
             }   
     
         } catch (error) {
             console.log(error);
         }
}

// @desc   Updating a particular enrollee
// @route  PUT /api/enrollee/:id
// @acess  private
const updateEnrollee = async (req, res) => {

    // getting the enrollee's id
    const { id } = req.params;

     // checking if its a valid id
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).json("No such enrollee found with that id!")
    }
    try {

        // finding the logged in agent
        const enrollee = await ENROLLEE.findById(id)

        // checking if the enrollee was found
        if (!enrollee) {
            return res.status(402).json({message: "Enrollee not found!"});
        }

       const { body } = req.body
       const image = req.file.filename;
        const updatedEnrollee = await ENROLLEE.findOneAndUpdate({_id: id},{ body, image }, {new: true})
        
        if (!updatedEnrollee) {
            return res.status(403).json("Enrollee not updated");
        } else {
            console.log(updatedEnrollee);
            return res.status(200).json(updatedEnrollee);
        }
        
        } catch (error) {
            console.log(error);
        }
}
// @desc    Delete a particular enrollee
// @route  DELETE /api/enrollee/:id
// @acess  private
const deleteEnrollee = async (req, res) => {

    // getting enrollee's id
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).json("No such enrollee found with that id!")
    }
    try {
        
        // finding an enrollee
        const enrollee = await ENROLLEE.findById(id)

        // checking if the user was found
        if (!enrollee) {
            return res.status(402).json({message: "Enrollee not found!"});
        }

        const deletedEnrollee = await ENROLLEE.findByIdAndDelete({_id: id})

        if (!deletedEnrollee) {
            return res.status(403).json("Enrollee not deleted!!")
        } else {
            return res.status(200).json(deletedEnrollee);
        }
    } catch (error) {
        console.log(error);
    }   
}

module.exports = {
    registerEnrollee,
    getEnrollees,
    getSingleEnrollee,
    updateEnrollee,
    deleteEnrollee
}