import axios from 'axios'

class RatingsService {

    constructor() {
        this.api = axios.create({
            baseURL : `${process.env.REACT_APP_API_URL}/ratings`,
            withCredentials : true
        })
    }

    getRatings = recipe_id => this.api.get(`/getRecipeRatings/${recipe_id}`)
    createRating = (recipe_id, ratingData) => this.api.post(`/createRating/${recipe_id}`, ratingData)
    
}

export default RatingsService