import axios from 'axios'

class AuthService {

    constructor() {
        this.api = axios.create({
            baseURL : `${process.env.REACT_APP_API_URL}/auth`,
            withCredentials : true
        })
    }

    signup = userData => this.api.post('/signup', userData).catch(err => console.log(err))
    login = userData => this.api.post('/login', userData).catch(err => console.log(err))
    editUser = userId => this.api.edit(`/edit/${userId}`).catch(err => console.log(err))
    isLoggedIn = () => this.api.get('/loggedin').catch(err => console.log(err))
    logOut = () => this.api.post('/logout').catch(err => console.log(err))
}

export default AuthService