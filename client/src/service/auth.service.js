import axios from 'axios'

class AuthService {

    constructor() {
        this.api = axios.create({
            baseURL : `${process.env.REACT_APP_API_URL}/auth`,
            withCredentials : true
        })
    }

    signup = userData => this.api.post('/signup', userData)
    login = userData => this.api.post('/login', userData)
    editUser = userId => this.api.edit(`/edit/${userId}`)
    isLoggedIn = () => this.api.get('/loggedin')
    logOut = () => this.api.post('/logout')
}

export default AuthService