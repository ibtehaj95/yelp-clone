const { string } = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name"],
        minlength: 1,
        maxlength: 50,
    },

    email: {
        type: String,
        required: [true, "Please provide the email"],
        minlength: 6,
        maxlength: 50,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Inavlid Email Format"
        ],
    },

    password: {
        type: String,
        required: [true, "Please provide the password"],
        minlength: 6,
    },
});

module.exports = mongoose.model("User", UserSchema);