const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const {checkLoggedIn, checkMongoId} = require('../middlewares')

router.post('/signup', (req, res) => {
    
    const {password, username} = req.body

    if (!username || !password) {
        res.status(400).json({message: 'Missing credentials'})
        return
    }

    User
        .findOne({username})
        .then(user => {
            if (user) {
                res.status(400).json({message: 'User already exits'})
                return
            }

            const salt = bcrypt.genSaltSync(10)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({username, password: hashPass})
                .then(newUser => req.login(newUser, err => err ? res.status(500).json({message: 'Login error'}) : res.json(newUser)))
                .catch(err => res.status(500).json({ message: 'Error saving user into DB', err }))
        })
})

router.post('/login', (req, res, next) => {

    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({message: 'Error authenticating user'})
            return
        }
        if (!theUser) {
            res.status(401).json(failureDetails)
            return
        }

        req.login(theUser, err => err ? res.status(500).json({message: 'Login error', err}) : res.json(theUser))

    }) (req, res, next)
})

router.put('/edit/:id', checkLoggedIn, checkMongoId, (req, res) => {
    
    const {username, image, password} = req.body

    const salt = bcrypt.genSaltSync(10)
    const hashPass = bcrypt.hashSync(password, salt)
    const user_id = req.params.id

    console.log(req.body)

    User
        .findByIdAndUpdate(user_id, {username, image, password: hashPass})
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: 'Error editing user in DB', err }))
})

router.get('/loggedin', (req, res) => req.isAuthenticated() ? res.json(req.user) : res.status(403).json({message: 'Unauthorized'}))

router.post('/logout', (req, res) => {
    req.logout()
    res.json({message: 'Logout success'})
})

router.delete('/delete/:id', checkLoggedIn, checkMongoId, (req, res) => {

    const user_id = req.params.id

    User
        .findByIdAndDelete(user_id)
        .then(removedUser => {
            req.logout()
            res.json({message: 'The account has been removed', removedUser})
        })
        .catch(err => res.status(500).json({ message: 'Error removing user from DB', err }))
})

module.exports = router