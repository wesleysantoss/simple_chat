'use strict';

const modelUser = require('../models/model-user'),
      bcrypt    = require('bcrypt');

module.exports = {
    index: (req, res, next) => res.render('site'),
    register: (req, res, next) => res.render('site/register'),
    authenticate: async (req, res, next) => {
        const {email, password} = req.body;

        try {
            const user = await modelUser.find({email});

            if(user.length) {
                const result = await bcrypt.compare(password, user[0].password);

                if(!result) {
                    res.send({status: "error", message: "incorrect password"});
                }else{
                    req.session.email = email;
                    res.send({status: "success", message: "successful login"});
                }
            }else{
                res.send({status: "error", message: "not found user"});
            }
        } catch (err) {
            res.send({status: "error", message: err});
        }
    },
    allUsers: async (req, res, next) => {
        try {
            const users = await modelUser.find();
            res.send({status: "success", message: users});
        } catch (err) {
            res.send({status: "error", message: err});
        }
    },
    createUser: async (req, res, next) => {
        try {
            let user         = new modelUser(req.body),
                {password}   = req.body,
                hashPassword = await bcrypt.hash(password, 10);

            user.password = hashPassword;
            await user.save();
            res.send({status: "success", message: 'user created'});
        } catch (err) {
            res.send({status: "error", message: err});
        }
    },
    editUser: async (req, res, next) => {
        try {
            await modelUser.findByIdAndUpdate(req.params.id, req.body);
            res.send({status: "success", message: 'edited user'});
        } catch (err) {
            res.send({status: "error", message: err});
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            await modelUser.findByIdAndRemove(req.params.id);
            res.send({status: "success", message: 'deleted user'});
        } catch (err) {
            res.send({status: "error", message: err});
        }
    }
}