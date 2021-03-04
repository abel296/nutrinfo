import { Component } from 'react'
import './App.css'

import Routes from './routes/Routes'
import Navigation from './layout/Navigation/Navigation'
import Footer from './layout/Footer/Footer'
import AuthService from '../service/auth.service'



class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedUser: undefined
    }

    this.authService = new AuthService()
  }

  storeUser(loggedUser) {
    this.setState({loggedUser}, () => console.log('Modified user', this.state.loggedUser))
  }

  fetchUser() {
    this.authService
    .isLoggedIn()
    .then(response => this.storeUser(response.data))
    .catch(() => this.storeUser(undefined))
  }

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    return(
      <>
      <Navigation storeUser={user => this.storeUser(user)} loggedUser={this.state.loggedUser} />

      <main>
        <Routes storeUser={user => this.storeUser(user) } loggedUser={this.state.loggedUser} />
      </main>

      <Footer />
    </>
    )
  }
}

export default App;
