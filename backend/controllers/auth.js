const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, UnauthenticatedError} = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        throw new BadRequestError("Required Field(s) Empty");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);
    const tempUser = {name, email, password: hashedPwd};

    const user = await User.create({
        ...tempUser,
    });

    const token = jwt.sign({
            userID: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
    
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
        },
        token,
    });
};

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        throw new BadRequestError("Please provide Email and Password");
    }
    
    //find email
    const user = await User.findOne({
        email,
    });

    if(!user){
        throw new UnauthenticatedError("Invalid Credentials");
    }

    const token = jwt.sign({
            userID: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );

    //check password

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw new UnauthenticatedError("Invalid Credentials");
    }
    
    res.status(StatusCodes.OK)
    .cookie(user.email, token, {
        maxAge: 2592000000, //in milliseconds, this value is for 30 days
        sameSite: "strict",
        httpOnly: true,
        secure: true,
    })
    .json();
};

const verify = async (req, res) => {
    const cookie = req.cookies;
    const email = Object.keys(cookie)[0];
    const token = cookie[email];
    if(!email || !token){
        throw new BadRequestError("Please provide UID and Token");
    }
    //check token
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(payload.email === email){
            res.status(StatusCodes.OK).json();
        }
        else{
            throw new UnauthenticatedError("Invalid Token");
        }
    }
    catch (err){
        // console.log(err);
        throw new UnauthenticatedError("Invalid Token");
    }
};

const clearCookie = async (req, res) => {
    const cookie = req.cookies;
    const email = Object.keys(cookie)[0];
    const token = cookie[email];
    if(!email || !token){
        throw new BadRequestError("Please provide UID and Token");
    }
    //check token
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(payload.email === email){
            res.status(StatusCodes.OK).clearCookie(`${email}`, {
                sameSite: "strict",
                httpOnly: true,
                secure: true,
            }).json();
        }
        else{
            throw new UnauthenticatedError("Invalid Token");
        }
    }
    catch (err){
        // console.log(err);
        throw new UnauthenticatedError("Invalid Token");
    }
};

module.exports = {
    register,
    login,
    verify,
    clearCookie,
}