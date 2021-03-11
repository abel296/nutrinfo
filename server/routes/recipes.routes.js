const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe.model')
const {checkLoggedIn, checkMongoId} = require('../middlewares')

// Endpoints
router.post('/createRecipe', checkLoggedIn, (req, res) => {

    const recipe = req.body

    Recipe
        .create(recipe)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ message: 'Error saving recipe into DB', err }))
})


router.get('/getAllRecipes', (req, res) => {

    Recipe
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ message: 'Error gettin all recipes from DB', err }))
})


router.get('/getOneRecipe/:id', checkLoggedIn, checkMongoId, (req, res) => {

    const recipe_id = req.params.id

    Recipe
        .findById(recipe_id)
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ message: 'Error getting recipe from DB', err }))
})


router.get('/getRecipesByUser/:id', checkLoggedIn, checkMongoId, (req, res) => {

    const user_id = req.params.id

    Recipe
        .find({owner: user_id})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ message: `Error getting user's recipes from DB`, err }))
})


router.delete('/deleteRecipe/:id', checkLoggedIn, checkMongoId, (req, res) => {

    const recipe_id = req.params.id

    Recipe
        .findByIdAndRemove(recipe_id)
        .then(response => response ? res.json({status: 200, message: 'Recipe deleted succesfully'}) : res.json({status: 404, message: 'Recipe not found'}))
        .catch(err => res.status(500).json({ message: 'Error removing recipe from DB', err }))
})


router.put('/editRecipe/:id', checkLoggedIn, checkMongoId, (req, res) => {
    
    const recipe_id = req.params.id, recipe = req.body

    Recipe
        .findByIdAndUpdate(recipe_id, recipe, {new: true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ message: 'Error editing recipe in DB', err }))
})


module.exports = router
