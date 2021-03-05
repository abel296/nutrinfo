const mongoose = require('mongoose')

module.exports = {
    checkLoggedIn: (req, res, next) => req.isAuthenticated() ? next() : res.json({message: 'Login to access'}),
    checkMongoId: (req, res, next) => mongoose.Types.ObjectId.isValid(req.params.id) ? next() : res.status(400).json({ status:400, message: 'Wrong ID format'})
}