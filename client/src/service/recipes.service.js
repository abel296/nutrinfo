import axios from 'axios'

class RecipeService {

    constructor(){
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_WHATEVER}/recipes`,
            withCredentials: true
    })}


    createRecipe = newRecipe => this.api.post('/createRecipe', newRecipe)
    getRecipes = () => this.api.get(`/getAllRecipes`)
    getRecipe = recipeId => this.api.get(`/getOneRecipe/${recipeId}`).catch(err => console.log(err))
    getUserRecipes = userId => this.api.get(`/getRecipesByUser/${userId}`).catch(err => console.log(err))
    deleteRecipe = recipeId => this.api.delete(`/deleteRecipe/${recipeId}`).catch(err => console.log(err))
    editRecipe = recipeId => this.api.put(`/editRecipe/${recipeId}`).catch(err => console.log(err))
}

export default RecipeService