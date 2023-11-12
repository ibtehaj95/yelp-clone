const { boolean } = require("joi");
const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Provide Title"],
        maxlength: 100,
    },
    // items: {
    //     type: [String],
    //     required: [true, "Provide Item"],
    // },
    items: [{
        name: {
            type: String,
            required: [true, "Provide Item Name"],
        },
        completed: {
            type: Boolean,
            default: false,
        },
    }],
    completed: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",    //this is just for us and has nothing to do with Mongoose
        required: [true, "Provide User"],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("List", ListSchema);