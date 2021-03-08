import { Component } from 'react'
import RecipeService from '../../../service/recipes.service'
import RecipesList from './RecipesList'

import {Container, Col, Row} from 'react-bootstrap'

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
            <Row>
                <Col xl={2}>

                </Col>
                <Col xl={10}>
                    <Container>

                        <h1>Recipes</h1>
                        
                        <RecipesList recipes={this.state.recipes} />

                    </Container>
                </Col>
            </Row>
            
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