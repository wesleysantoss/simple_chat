'use strict';

const express        = require('express'),
      router         = express.Router(),
      controllerSite = require('../controllers/controller-site');

const verifyLogin = (req, res, next) => {
      if(req.session.email){
            res.redirect('/chat');
      }else{
            next(); 
      } 
}

router.get('/', verifyLogin, controllerSite.index);
router.get('/register', controllerSite.register);
router.get('/users', controllerSite.allUsers);
router.post('/user', controllerSite.createUser);
router.put('/user/:id', controllerSite.editUser);
router.delete('/user/:id', controllerSite.deleteUser);

module.exports = router;