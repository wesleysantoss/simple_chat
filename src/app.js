'use strict';

const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      logger     = require('morgan'),
      routeSite  = require('./routes/route-site'),
      routeChat  = require('./routes/route-chat');

// Configura a view engine.
app.set('view engine', 'ejs');
app.set('views', 'public/views')

// Configura em qual diretorio está os arquivos estaticos.
app.use(express.static('public/assets/'));

// Transforma em JSON todo o body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gera um console.log de todas as requisições.
app.use(logger('dev'));

// Carrega as rotas do site.
app.use('/', routeSite);
app.use('/chat', routeChat);

module.exports = app;