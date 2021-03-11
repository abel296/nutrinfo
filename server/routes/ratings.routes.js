const express = require('express')
const router = express.Router()
const Rating = require('../models/rating.model')
const {checkLoggedIn, checkMongoId} = require('../middlewares')

router.get('/getRecipeRatings/:id', checkLoggedIn, checkMongoId, (req, res) => {

    const recipe_id = req.params.id

    Rating
        .find({recipe: recipe_id})
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ message: 'Error getting ratings from DB', err }))
})

router.post('/createRating/:id', checkLoggedIn, checkMongoId, (req, res) => {

    const recipe_id = req.params.id
    const user_id = req.user._id

    Rating
        .find({recipe: recipe_id})
        .then(response => {
            const ratingsOwners = response.map(elm => elm.owner.toString())
            if (ratingsOwners.includes(user_id.toString())) {
                res.status(500).json({ message: 'Recipe already rated'})
            }else {
                Rating
                    .create({owner: user_id, rating: req.body.rating, recipe: recipe_id})
                    .then(response => res.json(response))
                    .catch(err => res.status(500).json({ message: 'Error saving rating into DB', err }))

            }
        })
        .catch(err => res.status(500).json({ message: 'Error saving rating into DB', err }))
    

    // Rating
    //     .create({owner: user_id, rating: req.body.rating, recipe: recipe_id})
    //     .then(response => res.json(response))
    //     .catch(err => res.status(500).json({ message: 'Error saving rating into DB', err }))
})

router.delete('/deleteRatingsByUser/:id', checkLoggedIn, checkMongoId, (req, res) => {

    const user_id = req.params.id

    Rating
        .deleteMany({owner: user_id})
        .then(details => res.json({message: 'Ratings has been removed: ', details}))
        .catch(err => res.status(500).json({ message: `Error removing user's ratings from DB`, err }))
})

module.exports = router