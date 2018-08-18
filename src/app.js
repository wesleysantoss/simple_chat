'use strict';

const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      logger     = require('morgan'),
      routeSite  = require('./routes/route-site'),
      routeChat  = require('./routes/route-chat');

// configure the view engine.
app.set('view engine', 'ejs');
app.set('views', 'public/views')

// configure directory static.
app.use(express.static('public/assets/'));

// parse json body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// all requisition log.
app.use(logger('dev'));

// load the routers.
app.use('/', routeSite);
app.use('/chat', routeChat);

module.exports = app;