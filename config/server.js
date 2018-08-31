'use strict';

const http  = require('../src/app'),
      porta = process.env.PORT || 3000;
     
http.listen(porta);