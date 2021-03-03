const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comentSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: String,
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
},{
    timestamps:true
})

const Comment = mongoose.model('Comment', comentSchema)

module.exports = Comment