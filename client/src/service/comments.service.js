import axios from 'axios'

class CommentsService {

    constructor() {
        this.api = axios.create({
            baseURL : `${process.env.REACT_APP_API_URL}/comments`,
            withCredentials : true
        })
    }

    getComments = recipe_id => this.api.get(`/getRecipeComments/${recipe_id}`)
    createComment = (recipe_id, commentData) => this.api.post(`/createComment/${recipe_id}`, commentData)
    
}

export default CommentsService