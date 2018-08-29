'use strict';

require('./utils');
const modelUser = require('../models/model-user'),
      bcrypt    = require('bcrypt');

module.exports = {
    index: (req, res, next) => res.status(200).render('site'),
    register: (req, res, next) => res.status(200).render('site/register'),
    allUsers: handlerError(async (req, res, next) => {
        const users = await modelUser.find();
        const arrayOrderUsers = users.sort((a,b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        });

        res.status(200).send({status: "success", message: arrayOrderUsers});
    }),
    createUser: handlerError(async (req, res, next) => {
        let user         = new modelUser(req.body),
            {password}   = req.body,
            hashPassword = await bcrypt.hash(password, 10);

        user.password = hashPassword;
        await user.save();
        res.status(201).send({status: "success", message: 'user created'});
    }),
    editUser: handlerError(async (req, res, next) => {
        await modelUser.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({status: "success", message: 'edited user'});
    }),
    deleteUser: handlerError(async (req, res, next) => {
        await modelUser.findByIdAndRemove(req.params.id);
        res.status(200).send({status: "success", message: 'deleted user'});
    })
}