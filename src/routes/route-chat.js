'use strict';

const express = require('express'),
      router  = express.Router();

router.get('/', (req, res, next) => {
    res.send('Aqui vai ser o CHAT');
})

module.exports = router;