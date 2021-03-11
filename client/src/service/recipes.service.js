import axios from 'axios'

class RecipeService {

    constructor(){
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/recipes`,
            withCredentials: true
    })}


    createRecipe = newRecipe => this.api.post('/createRecipe', newRecipe)
    getRecipes = () => this.api.get(`/getAllRecipes`)
    getRecipe = recipeId => this.api.get(`/getOneRecipe/${recipeId}`)
    getUserRecipes = userId => this.api.get(`/getRecipesByUser/${userId}`)
    deleteRecipe = recipeId => this.api.delete(`/deleteRecipe/${recipeId}`)
    editRecipe = recipeId => this.api.put(`/editRecipe/${recipeId}`)
    deleteRecipesByUser = user_id => this.api.delete(`/deleteRecipesByUser/${user_id}`)
}

export default RecipeService