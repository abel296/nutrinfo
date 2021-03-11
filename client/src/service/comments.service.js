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
    deleteCommentsByUser = (user_id) => this.api.delete(`/deleteCommentsByUser/${user_id}`)
    
}

export default CommentsService