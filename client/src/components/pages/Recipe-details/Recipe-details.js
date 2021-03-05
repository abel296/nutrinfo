import { Component } from 'react'
import { Container , Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Recipe-details.css'

import RecipeComments from './Recipe-comments'
import RecipeIngredients from './Recipe-ingredients'
import RecipeSteps from './Recipe-steps'
import RecipeCommentForm from './Recipe-comment-form'

import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter'


import RecipeService from '../../../service/recipes.service'
import CommentsService from '../../../service/comments.service'


class RecipeDetails extends Component {

    constructor() {
        super()
        this.state = {
            recipe: undefined,
            recipeComments: []
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

    render() {
        return (
            <Container as='section'>

            {this.state.recipe
                ?

                <>
                <h2>{capitalizeFirstLetter(this.state.recipe.title)}</h2>

                <RecipeIngredients {...this.state.recipe} />

                <hr />

                <RecipeSteps  {...this.state.recipe} />

                {this.props.loggedUser && 

                    <RecipeCommentForm param={this.props.match.params.recipe_id} refreshList={() => this.loadRecipe()} />

                }

               
                    <RecipeComments recipeComments = {this.state.recipeComments} />
                

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