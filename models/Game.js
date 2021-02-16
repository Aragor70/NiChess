const mongoose = require('mongoose');


const GameSchema = new mongoose.Schema({
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    }],
    number: {
        type: Number,
        default: 0
    },
    scoreA: {
        type: Number,
        default: 0
    },
    scoreB: {
        type: Number,
        default: 0
    },
    board: [{
        position: {
            y: {
                type: Number
            },
            x: {
                type: Number
            }
        },
        player: {
            type: Number
        },
        type: {
            type: String
        },
        color: {
            type: String
        }
    }],
    started: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Game = mongoose.model('Game', GameSchema);