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
            default: 'https://res.cloudinary.com/abel-av/image/upload/v1615400298/nutrinfo/profile-default_ykw6zj.png'
        },
        alt: {
            type: String,
            default: 'default profile'
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