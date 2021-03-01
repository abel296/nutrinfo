const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe.model')

// Endpoints
router.post('/createRecipe', (req, res) => {
    const recipe = req.body

    Recipe
        .create(recipe)
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

router.get('/getAllRecipes', (req, res) => {

    Recipe
        .find()
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

router.get('/getOneRecipe/:id', (req, res) => {

    const recipe_id = req.params.id

    Recipe
        .findById(recipe_id)
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

router.delete('/deleteRecipe/:id', (req, res) => {

    const recipe_id = req.params.id

    Recipe
        .findByIdAndRemove(recipe_id)
        .then(() => res.json({message: 'The recipe has been removed succesfully', status: 200}))
        .catch(err => console.log(err))
})

router.put('/editRecipe/:id', (req, res) => {

    const recipe_id = req.params.id
    const recipe = req.body

    Recipe
        .findByIdAndUpdate(recipe_id, recipe, {new: true})
        .then(response => res.json(response))
        .catch(err => console.log(err))
})

module.exports = router
