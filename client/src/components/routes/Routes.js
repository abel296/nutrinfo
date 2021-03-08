import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home/Home'
import Recipes from '../pages/Recipes/Recipes'
import RecipeDetails from '../pages/Recipe-details/Recipe-details'
import Profile from '../pages/Profile/Profile'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'


const Routes = ({storeUser, loggedUser, handleAlert}) => {
    return (
        <>
        <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/recipes" render={() => <Recipes />} />
            <Route path="/recipe-details/:recipe_id" render={(props) => <RecipeDetails {...props} loggedUser={loggedUser} />} />
            <Route path="/profile" render={() => <Profile loggedUser={loggedUser} handleAlert={handleAlert} />} />
            <Route path="/signup" render={props => <Signup storeUser={storeUser} {...props} />} />
            <Route path="/login" render={props => <Login storeUser={storeUser} {...props} />} />
        </Switch>
        </>
    )
}

export default Routes