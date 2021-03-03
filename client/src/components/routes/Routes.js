import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home/Home'
import Recipes from '../pages/Recipes/Recipes'
import RecipeDetails from '../pages/Recipe-details/Recipe-details'
import Profile from '../pages/Profile/Profile'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'


const Routes = ({storeUser}) => {
    return (
        <>
        <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/recipes" render={() => <Recipes />} />
            <Route path="/recipe-details/:recipe_id" render={(props) => <RecipeDetails {...props} />} />
            <Route path="/profile" render={() => <Profile />} />
            <Route path="/signup" render={() => <Signup />} />
            <Route path="/login" render={() => <Login />} />
        </Switch>
        </>
    )
}

export default Routes