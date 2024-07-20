const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Add a New User
async function addUser(req, res) {
    newName = req.body.username;
    newEmail = req.body.email;
    newPass = req.body.password;

    try {
        const userExists = await User.findOne({email: newEmail});
        if (userExists) {
            res.status(200).send({message : "User already exists"});
        }
        const user = new User(req.body);
        console.log(user);
        await user.save();
        console.log(user);
        res.status(201).send({message :" Registration successfully...",task:user});
    } catch (error) {
        res.status(400).send(error);
    }
}

// Getting user details
async function getUser(req,res) {
    console.log("call the req.body",req.body);
    try {
        newEmail = req.body.email;
        password = req.body.password;
        console.log(password);

        const newUser = await User.findOne({email:newEmail});

        if (!newUser) {
            console.log("not new user found, please register first");
            res.status(400).send({error:'Invalid login Credentials'});
        }
        isMatch = await newUser.comparePassword(password);
        console.log(isMatch);
        if (!isMatch) {
            res.status(400).send({error : "Password Incorrect, please enter correct password"});
        }
        const token = jwt.sign({id: newUser._id},'tejas',{expiresIn:'1h'});
        res.status(200).send({message : "Login Successfully...",accessToken : token, task: User});

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    addUser,
    getUser
}