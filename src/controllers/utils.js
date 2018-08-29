module.exports = handlerError = fn => (req, res, next) => {
    fn(req, res, next).catch(err => res.send({status: "error", message: err}));
}