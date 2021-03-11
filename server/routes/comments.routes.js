const express = require('express')
const router = express.Router()
const Comment = require('../models/comment.model')
const {checkLoggedIn, checkMongoId} = require('../middlewares')

router.get('/getRecipeComments/:id', checkLoggedIn, checkMongoId, (req, res) => {

    const recipe_id = req.params.id

    Comment
        .find({recipe: recipe_id})
        .populate('owner')
        .sort({createdAt: -1})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ message: 'Error getting comments from DB', err }))
})

router.post('/createComment/:id', checkLoggedIn, checkMongoId, (req, res) => {

    console.log(req.body)
    const recipe_id = req.params.id
    const user_id = req.user._id
    

    Comment
        .create({owner: user_id, text: req.body.text, recipe: recipe_id})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ message: 'Error saving comment into DB', err }))
})

router.delete('/deleteCommentsByUser/:id', checkLoggedIn, checkMongoId, (req, res) => {

    const user_id = req.params.id

    Comment
        .deleteMany({owner: user_id})
        .then(details => res.json({message: 'Comments has been removed: ', details}))
        .catch(err => res.status(500).json({ message: `Error removing user's comments from DB`, err }))
})

module.exports = router