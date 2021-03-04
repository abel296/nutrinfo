import { Component } from 'react'
import { Container , Row, Col } from 'react-bootstrap'
import './Recipe-details.css'

import { Link } from 'react-router-dom'
import RecipeService from '../../../service/recipes.service'


class RecipeDetails extends Component {

    constructor() {
        super()
        this.state = {
            recipe: undefined
        }

        this.recipeService = new RecipeService()
    }
    
    componentDidMount() {
        this.loadRecipe()
    }

    loadRecipe() {
        const recipe_id = this.props.match.params.recipe_id

        this.recipeService
            .getRecipe(recipe_id)
            .then(response => this.setState({recipe: response.data}))
            .catch(err => console.log(err))

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    ordinalNumber(number) {
            var j = number % 10,
            k = number % 100;
        if (j === 1 && k !== 11) {
            return number + "st";
        }
        if (j === 2 && k !== 12) {
            return number + "nd";
        }
        if (j === 3 && k !== 13) {
            return number + "rd";
        }
        return number + "th";
    }

    render() {
        return (
            <Container as='section'>

            {this.state.recipe
            
                ?

                <>

                <h2>{this.capitalizeFirstLetter(this.state.recipe.title)}</h2>

                <Row>
                    <Col md={6}>
                        <img src={this.state.recipe.image[0].url} alt={this.state.recipe.image[0].alt} />
                        <h5>Ingredients</h5>
                        <ul>
                            {this.state.recipe.ingredients.map(elm => <li key={elm._id}><strong>{this.capitalizeFirstLetter(elm.name)}</strong>: {elm.quantity}</li>)}
                        </ul>
                    </Col>
                    <Col>
                        {this.state.recipe.labels.map((elm, idx)=> <span key={idx}>{this.capitalizeFirstLetter(elm)} </span>)}
                        <h6>{this.capitalizeFirstLetter(this.state.recipe.diet)}</h6>
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Col>
                        <h5>Steps</h5>
                        <ul>
                            {this.state.recipe.steps.map(elm =><li key={elm._id}><strong>{this.ordinalNumber(elm.number)}</strong> {this.capitalizeFirstLetter(elm.step)}</li>)}
                        </ul>
                    </Col>
                </Row>

                </>
                :
            
            <p>not yet</p>
            }
            <Link to='/recipes' className='btn btn-dark'>Go back</Link>

            </Container>
        )
    }
}

export default RecipeDetails