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
        url: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2014/04/03/00/42/chef-hat-309146_960_720.png'
        },
        alt: {
            type: String,
            default: 'chef hat'
        },
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