const AGENT = require('../models/agentsModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// generating the token
const tokenGenerator = (id) => {
    return jwt.sign({ id }, process.env.SECRET_PWD, { expiresIn: "12d" });
}

// @desc   Registering a new agent
// @route  POST /api/agent/register
// @acess  public
const registerAgent = async (req, res) => {

    // getting agent info from the input fields
    const { name, email, password, role, telephone} = req.body;

    try {
                // ************************************************************ validation

    // checking if all fleids where entered
    if (!name || ! email || !password || !role || !telephone) {
        return res.status(403).json({message: "Please fill in all feilds!"});
    }

    if (!validator.isEmail(email)) {
        return res.status(403).json({message:"Enter a valid email!"});
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(403).json({message: "Password is not strong enough!"});
    }
    // **************************************************************

    // checking if the agent email already exists
    const emailExists = await AGENT.findOne({email})
    if(emailExists) {
        return res.status(403).json({message: "The email is already exists!"});
    }   

    // hashing agent's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating a new agent
    const newAgent = await AGENT.create({
        name,
        email,
        password: hashedPassword,
        role,
        telephone
    })

    // checking if the agent was created 
    if (!newAgent) {
        return res.status(403).json({ message: "Agent not created"});
    } else {
         // generate token
         const token = tokenGenerator(newAgent._id);
        return res.status(200).json({
            newAgent,
            token: token
        });
    }
    } catch (error) {
        console.log(error);
        return res.status(403).json({message: error.message})
    };
}

// @desc   Logging in agent
// @route  POST /api/agent/login
// @acess  public
const loginAgent = async (req, res) => {
    // getting the email & password
    const { email, password } = req.body;

    try {
        // checking if all fields where filled
        if (!email || !password) {
            return res.status(403).json({message: "Please fill in all fields!"})
        }

        // checking is the user exists in the db
        const agent = await AGENT.findOne({email})
        if (!agent) {
            return res.status(400).json({message: "Agent not found!"})
        }

        // matching the passwords
        const match = await bcrypt.compare(password, agent.password);
        if (!match) {
            return res.status(403).json({message: "Invalid password!"});
        } else {

            // generating token 
            const token = tokenGenerator(agent._id);
            return res.status(200).json({
                _id: agent._id, 
                name: agent.name,
                email: agent.email,
                token: token
            });
        }

    } catch (error) {
        console.log(error);
    }
}

// @desc   Get agents
// @route  GET /api/agent/agents
// @acess  private
const getAgents = async (req, res) => {

    try {
        const agents = await AGENT.find({}).sort({createdAt: -1})
        if (!agents) {
            return res.status(404).json({message: "no agents found!"});
        } else {
            return res.status(200).json(agents);
        }
    } catch (error) {
       console.log(error);
    }
}

// @desc   Get a single agent
// @route  GET /api/agent/:id
// @acess  private
const getSingleAgent = async (req, res) => {
    res.json({ message: "single agent"});
}

// @desc   Updating a particular agent
// @route  PUT /api/agent/:id
// @acess  private
const updateAgent = async (req, res) => {
    res.json({ message: "agent updated"});
}

// @desc    Delete a particular agent
// @route  DELETE /api/agent/:id
// @acess  private
const deleteAgent = async (req, res) => {
    res.json({ message: "agent deleted"});
}

module.exports = {
    registerAgent,
    loginAgent,
    getAgents,
    getSingleAgent,
    updateAgent,
    deleteAgent
}