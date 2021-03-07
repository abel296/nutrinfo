const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String,
            default: 'https://masquevinilo.com/5324-thickbox_default/vinilo-decorativo-verduras-a-la-sarten.jpg'
        },
        alt: String
    },
    ingredients: {
        type: [{
            name: String,
            quantity: Number,
            unit: [String]
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
    labels: [String],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})


const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe