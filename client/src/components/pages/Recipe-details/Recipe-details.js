import { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Recipe-details.css'

import RecipeComments from './Recipe-comments'
import RecipeIngredients from './Recipe-ingredients'
import RecipeSteps from './Recipe-steps'
import Rating from './Recipe-rating'
import RecipeCommentForm from './Recipe-comment-form'
import Spinner from './../../shared/Spinner/Spinner'

import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter'


import RecipeService from '../../../service/recipes.service'
import CommentsService from '../../../service/comments.service'
import RatingsService from '../../../service/ratings.service'



class RecipeDetails extends Component {

    constructor() {
        super()
        this.state = {
            recipe: undefined,
            recipeComments: [],
            recipeRating: 0
        }

        this.recipeService = new RecipeService()
        this.commentsService = new CommentsService()
        this.ratingsService = new RatingsService()
    }
    
    componentDidMount() {
        this.loadRecipe()
    }

    loadRecipe() {
        const recipe_id = this.props.match.params.recipe_id
        const recipe = this.recipeService.getRecipe(recipe_id)
        const comments = this.commentsService.getComments(recipe_id)
        const ratings = this.ratingsService.getRatings(recipe_id)

        Promise
            .all([recipe, comments, ratings])
            .then(responses => {
                if (responses[0].data.message) {
                    
                    this.props.handleAlert(true, 'Error', responses[0].data.message)
                    this.props.history.push('/recipes')  
                } else {
                    const ratingsSum = responses[2]?.data.reduce((acc, elm) => acc + elm.rating, 0)
                    const ratingsAverage = (ratingsSum/responses[2]?.data.length).toFixed(2)

                    this.setState({recipe: responses[0]?.data, recipeComments: responses[1]?.data, recipeRating: ratingsAverage})
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container as='section'>

            {this.state.recipe
                ?

                <>
                <h2>{capitalizeFirstLetter(this.state.recipe.title)}</h2>
                <p><strong>User:</strong> {this.state.recipe.owner.username}</p>

                <RecipeIngredients {...this.state.recipe} />

                <hr />

                <RecipeSteps  {...this.state.recipe} />

                {this.props.loggedUser && 
                    <>
                    <Rating param={this.props.match.params.recipe_id} recipeRating={this.state.recipeRating} refreshList={() => this.loadRecipe()} />

                    <RecipeCommentForm param={this.props.match.params.recipe_id} refreshList={() => this.loadRecipe()} />
                    </>
                }

               
                    <RecipeComments recipeComments = {this.state.recipeComments} />
                

                    <Link to='/recipes' className='btn btn-dark'>Go back</Link>
                </>
                :
                <>
                    <div className='spinner-div'>
                        <Spinner></Spinner>
                    </div>

                </>
            }

            </Container>
        )
    }
}

export default RecipeDetails