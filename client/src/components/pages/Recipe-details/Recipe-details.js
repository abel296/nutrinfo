import { Component } from 'react'
import { Container , Row, Col, Form, Button } from 'react-bootstrap'
import './Recipe-details.css'
import { Link } from 'react-router-dom'
import RecipeComment from './Recipe-comment'

import RecipeService from '../../../service/recipes.service'
import CommentsService from '../../../service/comments.service'


class RecipeDetails extends Component {

    constructor() {
        super()
        this.state = {
            recipe: undefined,
            recipeComments: [],
            text: ''
        }

        this.recipeService = new RecipeService()
        this.commentsService = new CommentsService()
    }
    
    componentDidMount() {
        this.loadRecipe()
    }

    loadRecipe() {
        const recipe_id = this.props.match.params.recipe_id
        const recipe = this.recipeService.getRecipe(recipe_id)
        const comments = this.commentsService.getComments(recipe_id)

        Promise
            .all([recipe, comments])
            .then(responses => this.setState({recipe: responses[0].data, recipeComments: responses[1].data, text: ''}))
            .catch(err => console.log(err))

    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({[name]: value})
    }

    handleSubmit(e) {
        e.preventDefault()
        const recipe_id = this.props.match.params.recipe_id
        
        

        this.commentsService
            .createComment(recipe_id, this.state)
            .then(() => this.loadRecipe())
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

                {this.props.loggedUser && 
                    <Form onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" rows={3} type='text' name='text' value={this.state.comment} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Submit
                    </Button> 
                </Form>
                }

                <Row>
                    
                        {this.state.recipeComments.map(elm => <RecipeComment {...elm} key={elm._id}/>)}
                    
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