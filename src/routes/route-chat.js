'use strict';

const express        = require('express'),
      router         = express.Router(),
      controllerChat = require('../controllers/controller-chat');

const verifyLogin = (req, res, next) => {
    if(req.session.email) next();
    res.redirect('/');
}

router.get('/', verifyLogin, controllerChat.index);
router.get('/logout', controllerChat.logout);

module.exports = router;