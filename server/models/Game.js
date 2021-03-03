const mongoose = require('mongoose');


const GameSchema = new mongoose.Schema({
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    number: {
        type: Number,
        default: 0
    },
    score: [{
        type: Number,
        default: 0
    }],
    history: [{
        prev: {
            type: Array
        },
        next: {
            type: Array
        }
    }],
    turn: {
        type: Number,
        default: 0
    },
    fallen: [{
        player: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: null
        }
    }],
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
            type: String,
            default: null
        },
        type: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: '#fff'
        }
    }],
    started: {
        type: Boolean,
        default: false
    },
    finished: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Game = mongoose.model('Game', GameSchema);