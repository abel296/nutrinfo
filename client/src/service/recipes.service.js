import axios from 'axios'

class RecipeService {

    constructor() {
        
        this.api = axios.create({
            baseULR: `${process.env.REACT_APP_API_URL}/recipes`,
            withCredentials: true
        })
    }

    createRecipe = newRecipe => this.api.post('/createRecipe', newRecipe).catch(err => console.log(err))
    getRecipes = () => {
        console.log(this.api)
        return this.api.get('/getAllRecipes').catch(err => console.log(err))
    }
    getRecipe = recipeId => this.api.get(`/getOneRecipe/${recipeId}`).catch(err => console.log(err))
    getUserRecipes = userId => this.api.get(`/getRecipesByUser/${userId}`).catch(err => console.log(err))
    deleteRecipe = recipeId => this.api.delete(`/deleteRecipe/${recipeId}`).catch(err => console.log(err))
    editRecipe = recipeId => this.api.put(`/editRecipe/${recipeId}`).catch(err => console.log(err))
}

export default RecipeService