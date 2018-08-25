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

const modelUser    = require('./models/model-user'),
      modelHistory = require('./models/model-history');

io.on('connection', socket => {
      socket.on('newUser-client-serve', async data => {
            const {email, message} = data,
                  result           = await modelUser.find({email, status: 1});
            
            if(result.length < 1){
                  await modelUser.findOneAndUpdate({email}, {"status": 1});
                  socket.broadcast.emit('newUser-serve-client', {email, message});
            }
      });

      socket.on('logoutUser-client-serve', async data => {
            const {email, message} = data;
            socket.broadcast.emit('logoutUser-serve-client', {email, message});
            await modelUser.findOneAndUpdate({email}, {"status": 0});
      })

      socket.on('newMessage-client-serve', async data => {
            const {email, name, message} = data;
            const history = new modelHistory({sentByEmail: email, message});

            await history.save();
            socket.broadcast.emit('newMessage-serve-client', {name, message});
            socket.emit('newMessage-serve-client', {name, message});
      })
})

module.exports = http;