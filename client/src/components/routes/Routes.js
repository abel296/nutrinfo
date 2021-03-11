import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/Home/Home'
import Recipes from '../pages/Recipes/Recipes'
import RecipeDetails from '../pages/Recipe-details/Recipe-details'
import Profile from '../pages/Profile/Profile'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'
import UserForm from '../pages/User-Form/UserForm'
import Spinner from '../shared/Spinner/Spinner'


const Routes = ({storeUser, loggedUser, handleAlert, refreshUser}) => {
    return (
        <>
        <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/recipes" render={() => <Recipes />} />
            <Route path="/recipe-details/:recipe_id" render={(props) => <RecipeDetails {...props} loggedUser={loggedUser} handleAlert={handleAlert} />} />
            <Route path="/signup" render={props => <Signup storeUser={storeUser} {...props} handleAlert={handleAlert} />} />
            <Route path="/login" render={props => <Login storeUser={storeUser} {...props} handleAlert={handleAlert} />} />
            {loggedUser === undefined
            ? <Spinner /> :
            loggedUser === null ?
            <Redirect to='/' />
            :
            <>
            <Route path="/profile" render={props => <Profile loggedUser={loggedUser} handleAlert={handleAlert} {...props} refreshUser={refreshUser} /> } />
            <Route path="/edit-user/:user_id" render={(props) => <UserForm {...props} loggedUser={loggedUser} refreshUser={refreshUser} />} />
            </>
            }
            
            
        </Switch>
        </>
    )
}

export default Routes