const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        minLength: 2,
        maxLength: 22,
        default: 'anonymous'
    },
    email: {
        type: String,
        unique: true
    },
    avatar: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'User'
    },
    ip: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.getSignedToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_Secret, { expiresIn: process.env.JWT_EXPIRE })
}

module.exports = User = mongoose.model('User', UserSchema);