const mongoose = require("mongoose");
const { Schema } = require("mongoose")

const controlSchema = new Schema({
    temp: {
        type: Number
    },
    light: {
        type: Number
    },
    sound: {
        type: Number
    },
    humidity: {
        type: Number
    }
}, { timestamps: true })

module.exports = mongoose.model("Control", controlSchema);