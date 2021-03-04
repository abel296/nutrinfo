const express = require('express')
const router = express.Router()
const Comment = require('../models/comment.model')

router.get('/getRecipeComments/:id', (req, res) => {

    const recipe_id = req.params.id

    Comment
        .find({recipe: recipe_id})
        .populate('owner')
        .sort({createdAt: -1})
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

router.post('/createComment/:id', (req, res) => {

    console.log(req.body)
    const recipe_id = req.params.id
    const user_id = req.user._id
    

    Comment
        .create({owner: user_id, text: req.body.text, recipe: recipe_id})
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

module.exports = router