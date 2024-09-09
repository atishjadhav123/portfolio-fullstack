
const mongoose = require("mongoose")
const userSchma = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    otp: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("user", userSchma)