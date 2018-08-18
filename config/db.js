'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/simplechat', { useNewUrlParser: true });
mongoose.connection.on('connected', () =>  console.log(`MongoDB connected`));
mongoose.connection.on('error', err =>  console.log(`MongoDB error: ${err}`));

module.exports = mongoose;