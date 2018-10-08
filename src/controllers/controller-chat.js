'use strict';

require('./utils');
const modelUser    = require('../models/model-user'),
      modelHistory = require('../models/model-history'),
      bcrypt       = require('bcrypt');

module.exports = {
    index: (req, res, next) => {
        res.status(200).render('chat', {email: req.session.email, name: req.session.name});
    },
    chatPrivate: handlerError(async (req, res, next) => {
        const email = req.params.email;
        const user  = await modelUser.find({email});

        res.status(200).render('chat/chat-private', {user: user[0]});
    }),
    authenticate: handlerError(async (req, res, next) => {
        const {email, password} = req.body;
        const user = await modelUser.find({email});

        if(user.length) {
            const result = await bcrypt.compare(password, user[0].password);

            if(!result) {
                res.send({status: "error", message: "incorrect password"});
            }else{
                req.session.email = email;
                req.session.name  = user[0].name;
                res.cookie('email', email);
                res.cookie('name', user[0].name);
                res.status(202).send({status: "success", message: "successful login"});
            }
        }else{
            res.send({status: "error", message: "not found user"});
        }
    }),
    AllHistory: handlerError(async(req, res, next) => {
        const history = await modelHistory.find();
        res.status(200).send({status: "success", message: history});
    }),
    logout: async (req, res, next) => {
        await req.session.destroy();
        res.redirect('/');
    }
}