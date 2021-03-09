const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    image: {
        url: String,
        alt: String
    },
    fav_recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }],
},{
    timestamps:true
})

const User = mongoose.model('User', userSchema)

module.exports = User