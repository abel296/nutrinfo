const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: [{
        url: String,
        alt: String
    }],
    ingredients: {
        type: [{
            name: String,
            quantity: Number
        }],
        required: true
    },
    nutrients: [{
        label: String,
        quantity: Number,
        unit: String
    }],
    steps: [{
        number: Number,
        step: String
    }],
    time: Number,
    servings: Number,
    diet: {
        type: String,
        enum: ["high-protein", "low-carb", "low-fat", "balanced", "high-fiber", "low-sodium"]
    },
    rating: [{
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        qualification: Number
    }],
    labels: [String],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String
    }]
}, {
    timestamps: true
})


const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe