const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const GuestSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'anonymous'
    },
    ip: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

GuestSchema.methods.getSignedToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_Secret, { expiresIn: process.env.JWT_EXPIRE })
}
module.exports = Guest = mongoose.model('Guest', GuestSchema);