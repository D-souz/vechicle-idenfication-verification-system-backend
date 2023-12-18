const ENROLLEE = require('../models/enrolleeModel');
const mongoose = require('mongoose');
const qrcode = require("qrcode");

// @desc   Generating qr code with enrollee info
// @route  GET /api/qrcode/:id
// @acess  private
const generateQrcode = async (req, res) =>{

    // getting enrollee's id
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).json("No such enrollee found with that id!")
    }

    try {
        // finding enrollee
        const enrollee = await ENROLLEE.findById(id)

        // checking if the enrollee was found
        if (!enrollee) {
            return res.status(402).json({message: "Enrollee not found!"});
        } else {

            const enrolleeData = {
                name: enrollee.name,
                email: enrollee.email,
                telephone: enrollee.telephone,
                address: enrollee.address,
                nin: enrollee.nin,
                vin: enrollee.vin,
                numberPlate: enrollee.numberPlate,
                model: enrollee.model,
            }
            // Converting the data into String format
            const stringData = JSON.stringify(enrolleeData)

            // Generate a QR code with the enrollee as the content
            qrcode.toDataURL(stringData, {quality: 0.9 }, function (err, code) {
                if(err) return console.log('Error generating QR code:', err)
            
                // Return the QR code as the response
                console.log(code)
                return res.status(200).json(code);
                // return res.status(200).send(code);
            })
        }

    } catch (error) {
        console.log(error);
    }
}

// @desc   Verifying and validating qr code of an enrollee & displaying info
// @route  GET /api/qrcode/verify
// @acess  private
const verifyQrcode = async (req, res) =>{
    res.json({message: "qrcode verified!"})
}

module.exports = {
    generateQrcode,
    verifyQrcode
}