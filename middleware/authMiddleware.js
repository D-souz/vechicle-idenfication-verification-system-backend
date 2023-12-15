const jwt = require('jsonwebtoken');
const AGENT = require('../models/agentsModel');

const protectRoutes = async (req, res, next) => {

    // verifying authetication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(403).json({error: 'Authorization token required!'});
    } 
    else {

        try {

        // getting the token from the header
        const token = authorization.split(' ')[1];

        // verify token
        const decoded = jwt.verify(token, process.env.SECRET_PWD);

        // Getting the user from the token
        req.user = await AGENT.findById(decoded.id).select('_id');

            next();
        } catch (error) {

            console.log(error);
            res.status(403).json({error: 'Request not authorized!'});
        }  

    }
}

module.exports = protectRoutes;