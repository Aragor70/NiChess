const mongoose = require('mongoose');


const TableSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    guests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    }],
    name: {
        type: String,
        default: "Table",
        unique: true
    },
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