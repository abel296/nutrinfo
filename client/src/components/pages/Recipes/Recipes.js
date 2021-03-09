import { Component } from 'react'
import RecipeService from '../../../service/recipes.service'
import RecipesList from './RecipesList'
import LabelsFilter from './LabelsFilter'
import Spinner from './../../shared/Spinner/Spinner'

import {Container, Col, Row} from 'react-bootstrap'
import './Recipes.css'

class Recipes extends Component {

    constructor() {
        super()
        this.state = {
            recipes: undefined
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

    filterRecipes(labelsArr) {

        this.recipeService
            .getRecipes()
            .then(allRecipes => {
                const filteredRecipes = allRecipes.data.filter(recipe => labelsArr.every(label => recipe.labels?.includes(label)))
                this.setState({recipes: filteredRecipes})
            })
            .catch(err => console.log(err))

        
    }


    render() {

        return(

            <>
            {this.state.recipes
                ?
                <>
            <Row className='recipes-section'>
                <Col lg={2} md={3} xs={12}>

                    <LabelsFilter filter={(labelsArr)=>this.filterRecipes(labelsArr)} />

                </Col>
                <Col lg={10} md={9} xs={12}>
                    <Container>

                        <h1>Recipes</h1>
                        
                        <RecipesList recipes={this.state.recipes} />

                    </Container>
                </Col>
            </Row>
                </>
                :
                <>

            <div className='spinner-div'>
                <Spinner></Spinner>
            </div>

                </>
            }

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