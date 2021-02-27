const mongoose = require('mongoose');


const TableSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    name: {
        type: String,
        default: "Table"
    },
    players: {
        white: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
        black: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }},
    games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Table = mongoose.model('Table', TableSchema);