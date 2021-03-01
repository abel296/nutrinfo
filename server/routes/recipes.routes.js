const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe.model')
const User = require('../models/user.model')
const ObjectId = require ('mongoose').Types.ObjectId

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


router.get('/getRecipesByUser/:id', (req, res) => {

    const user_id = req.params.id

    Recipe
        .find({owner: user_id})
        .then(response => res.json(response))
        .catch(err => console.log(err))
})


router.delete('/deleteRecipe/:id', (req, res) => {

    const recipe_id = req.params.id

    Recipe
        .findByIdAndRemove(recipe_id)
        .then(response => response ? res.json({status: 200, message: 'Recipe deleted succesfully'}) : res.json({status: 404, message: 'Recipe not found'}))
        .catch(err => console.log(err))
})


router.put('/editRecipe/:id', (req, res) => {
    
    const recipe_id = req.params.id, recipe = req.body

    Recipe
        .findByIdAndUpdate(recipe_id, recipe, {new: true})
        .then(response => res.json(response))
        .catch(err => console.log(err))
})


module.exports = router
