'use strict';

const express    = require('express'),
      session    = require('express-session'),
      app        = express(),
      http       = require('http').Server(app),
      io         = require('socket.io')(http),
      bodyParser = require('body-parser'),
      logger     = require('morgan'),
      routeSite  = require('./routes/route-site'),
      routeChat  = require('./routes/route-chat');

// configure the view engine.
app.set('view engine', 'ejs');
app.set('views', 'public/views');

// configure directory static.
app.use(express.static('public/assets/'));

// set the config session.
app.use(session({
      secret: 'session_login',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false}
}))

// parse json body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// all requisition log.
app.use(logger('dev'));

// load the routers.
app.use('/', routeSite);
app.use('/chat', routeChat);

let usersOnline = [];

io.on('connection', socket => {
      socket.on('newUser-client-serve', data => {
            const {email, message} = data;
            if(!usersOnline.includes(email)){
                  socket.broadcast.emit('eventUser-serve-client', message);
                  usersOnline.push(email);
            }
      });

      socket.on('userLogout-client-serve', data => {
            const {email, message} = data;
            usersOnline = usersOnline.filter(e => e != email);
            socket.broadcast.emit('eventUser-serve-client', message);
      })
})

module.exports = http;