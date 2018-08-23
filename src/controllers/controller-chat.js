'use strict';

module.exports = {
    index: (req, res, next) => {
        res.render('chat', {email: req.session.email, name: req.session.name});
    },
    logout: async (req, res, next) => {
        await req.session.destroy();
        res.redirect('/');
    },
}