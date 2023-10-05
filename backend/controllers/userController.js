const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, { expiresIn: "3d"})
}


// login user
const loginUser = async (req, res) => {

    
    const  {email, password} = req.body
    const user = await User.findOne({email: email})
    const userid = user.id
    const weight = user.weight
    const height = user.height
    const gender = user.gender

    try {
        const user = await User.login(email, password)
        

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token, userid, weight, height, gender})
        

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// add user info !!!!!!!!!!!!!!!!
const infoUser = async (req, res) => {
    const { id } = req.params
    const {gender, height, weight} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such person"})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    res.status(200).json(user)

}

module.exports = {
    loginUser,
    signupUser,
    infoUser
}