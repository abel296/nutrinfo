import { Component } from 'react'
import RecipeService from '../../../service/recipes.service'

class Recipes extends Component {

    constructor() {
        super()
        this.state = {
            recipes: []
        }

        this.recipeService = new RecipeService()
    }

    componentDidMount() {
        console.log(this.recipeService)
        this.loadRecipes()
    }

    loadRecipes() {

        this.recipeService
            .getRecipes()
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }


    render() {

        return(
            <>
            <h1>Recipes</h1>
            <li>
                {this.state.recipes?.map(elm => <h1>{elm.title}</h1>)}
            </li>
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