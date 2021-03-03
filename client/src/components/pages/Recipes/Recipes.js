import { Component } from 'react'
import RecipeService from '../../../service/recipes.service'
import RecipesList from './RecipesList'

import {Container} from 'react-bootstrap'

class Recipes extends Component {

    constructor() {
        super()
        this.state = {
            recipes: []
        }

        this.recipeService = new RecipeService()
    }

    componentDidMount() {
        this.loadRecipes()
    }

    loadRecipes() {

        this.recipeService
            .getRecipes()
            .then(response => this.setState({recipes: response.data}))
            .catch(err => console.log(err))
    }


    render() {

        return(
            <>
                <Container>

                    <h1>Recipes</h1>
                    
                    <RecipesList recipes={this.state.recipes} />
                
                </Container>
            
            </>
        )
    }
}

export default Recipes





















// const Recipes = () => {
//     return (
//         <h1>Recipes</h1>
//     )
// }

// export default Recipes