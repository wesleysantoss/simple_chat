'use strict';

const express        = require('express'),
      router         = express.Router(),
      controllerSite = require('../controllers/controller-site');

router.get('/', controllerSite.index);
router.get('/register', controllerSite.register);

router.get('/users', controllerSite.allUsers);
router.post('/user', controllerSite.createUser);
router.put('/user/:id', controllerSite.editUser);
router.delete('/user/:id', controllerSite.deleteUser);

module.exports = router;