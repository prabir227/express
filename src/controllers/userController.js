const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const SECRETKEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const signUp = async (req,res)=>{


    const {username, password, email} = req.body;
    try {
        existingUser = await userModel.findOne({email: email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        const token = jwt.sign({email: result.email, id: result._id}, SECRETKEY);
        res.status(201).json({user: result, token: token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const signIn = async (req,res)=>{
    const {email, password}= req.body;
    try{
        const existingUser = await userModel.findOne({email: email});
        if(!existingUser){
            return res.status(404).json({message: "User does not exist"});
        }

        const matchPasseord = await bcrypt.compare(password, existingUser.password);
        if(!matchPasseord){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, SECRETKEY);
        res.status(200).json({user: existingUser, token: token});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

module.exports = {
    signUp,
    signIn
}