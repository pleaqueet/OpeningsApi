const mongoose = require('mongoose')
const {v4} = require('uuid');

const openingScheme = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    listened: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('opening', openingScheme);
