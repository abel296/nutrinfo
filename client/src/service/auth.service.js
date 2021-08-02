import axios from 'axios'

class AuthService {

    constructor() {
        this.api = axios.create({
            baseURL : `${process.env.REACT_APP_BASE_URL}/auth`,
            withCredentials : true
        })
    }

    signup = userData => this.api.post('/signup', userData)
    login = userData => this.api.post('/login', userData)
    editUser = (userId, userData) => this.api.put(`/edit/${userId}`, userData)
    isLoggedIn = () => this.api.get('/loggedin')
    logOut = () => this.api.post('/logout')
    deleteUser = (user_id) => this.api.delete(`/delete/${user_id}`)
}

export default AuthService