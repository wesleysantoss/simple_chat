'use strict';

const mongoose = require('../../config/db'),
      Schema = mongoose.Schema;

let historySchema = new Schema({
    sentByEmail: {
        type: String,
        require: true
    },
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('History', historySchema);