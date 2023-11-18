const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {UnauthenticatedError} = require("../errors");

const auth = (req, res, next) => {
    const cookie = req.cookies;
    const email = Object.keys(cookie)[0];
    const token = cookie[email];
    // console.log(email, token);
    if(!email || !token){
        throw new UnauthenticatedError("Token Not Found");
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userID: payload.userID,
            name: payload.name,
        }
        next();
    }
    catch (err){
        // console.log(err);
        throw new UnauthenticatedError("Invalid Token");
    }
};

module.exports = auth;