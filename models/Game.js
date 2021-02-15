const mongoose = require('mongoose');


const GameSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    }],
    number: {
        type: number,
        default: 0
    },
    scoreA: {
        type: number,
        default: 0
    },
    scoreB: {
        type: number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Game = mongoose.model('Game', GameSchema);