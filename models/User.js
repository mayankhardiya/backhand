const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    family: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    aadhar: {
        type: String,
        required: true
    },
    create: {
        type: String,
    },
    updateby: {
        type: String,
    },
    cratedate: {
        type: Date,
        default: Date.now
    },
    updatedate: {
        type: String,
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)