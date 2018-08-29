'use strict';

const express        = require('express'),
      router         = express.Router(),
      controllerChat = require('../controllers/controller-chat');

const verifyLogin = (req, res, next) => {
    if(req.session.email){
        next();
    }else{
        res.redirect('/');
    } 
}

router.get('/', verifyLogin, controllerChat.index);
router.post('/authenticate', controllerChat.authenticate);
router.get('/history', controllerChat.AllHistory);
router.get('/logout', controllerChat.logout);

module.exports = router;