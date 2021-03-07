const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ratingSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: Number,
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
},{
    timestamps:true
})

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating