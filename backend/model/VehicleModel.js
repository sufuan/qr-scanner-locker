const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim:true
    },
    // vehicleInfo: {
    //     type: String,
    //     required: true
    // },
    qrCode: {
        type: String,
        required: true,
        trim:true
    },
    locked: {
        type: Boolean,
        default: false
    }
})

const Vehicle  = mongoose.model('Vehicle', vehicleSchema)

module.exports = Vehicle