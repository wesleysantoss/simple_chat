'use strict';

require('dotenv').config();
const mongoose = require('mongoose'),
      URI      = process.env.MONGO_URI || 'mongodb://localhost:27017/simplechat';

mongoose.connect(URI, { useNewUrlParser: true });

mongoose.connection.on('connected', () =>  console.log(`MongoDB is connected`));
mongoose.connection.on('error', err =>  console.log(`MongoDB error: ${err}`));

module.exports = mongoose;