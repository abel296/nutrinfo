import { Component } from 'react'
import RecipeService from '../../../service/recipes.service'
import RecipesList from './RecipesList'
import LabelsFilter from './LabelsFilter'
import Spinner from './../../shared/Spinner/Spinner'
import magnifyingGlassImg from './magnifying-glass.png'

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
            .catch(() => this.props.handleAlert(true, 'Error', 'Error loading recipes'))
    }

    filterRecipes(state) {

        const labelsArr = state.labelsSelected
        const ingredient = state.ingredient.toLowerCase()

        this.recipeService
            .getRecipes()
            .then(allRecipes => {
                const filteredRecipes = allRecipes.data.filter(recipe => labelsArr.every(label => recipe.labels?.includes(label)) && recipe.ingredients.some(ing => ing.name.toLowerCase().includes(ingredient)))
                this.setState({recipes: filteredRecipes})
            })
            .catch(() => this.props.handleAlert(true, 'Error', 'Error filtering recipes'))
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
                    {this.state.recipes[0]
                    ?
                        <Col lg={10} md={9} xs={12}>
                            <Container>

                                <h1>Recipes</h1>
                                
                                <RecipesList recipes={this.state.recipes} />

                            </Container>
                        </Col>
                    
                    :
                    <Container>

                        <Row className='justify-content-center'>
                            <Col md={7}>

                                <h5>The filters you applied doesn't match with any recipe</h5>
                                <img className='glass-img' src={magnifyingGlassImg} alt='Magnifying glass logo' />

                            </Col>
                        </Row>

                    </Container>
                   
                }
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