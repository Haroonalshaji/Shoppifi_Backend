// import { response } from 'express';
// import users from '../Models/userSchema.js';
// import jwt from 'jsonwebtoken';

const { response } = require('express');
const users = require('../Models/userSchema');
const jwt = require('jsonwebtoken')

// Logic for register
exports.register = async (req, res) => {
    // get user details from request
    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(404).json("User already registered.")
        } else {
            const newUser = new users({ username, email, password });
            await newUser.save()    //to save this new user in mongodb
            res.status(200).json(newUser)
        }
    } catch (error) {
        response.status(404).json(error);
    }

}

// Logic for login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWTKEY)
            res.status(200).json({ existingUser, token })
            console.log(token);
        } else {
            res.status(404).json("Incorrect email or password")
        }
    } catch (error) {
        res.status(404).json(error)
    }
}
