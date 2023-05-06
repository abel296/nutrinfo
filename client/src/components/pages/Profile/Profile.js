import { Component } from 'react'
import RecipeForm from "../Recipe-form/Recipe-form"
import UserRecipesList from "./UserRecipesList"
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import './Profile.css'

import RecipeService from '../../../service/recipes.service'
import AuthService from '../../../service/auth.service'
import CommentsService from '../../../service/comments.service'
import RatingsService from '../../../service/ratings.service'
import { Link } from 'react-router-dom'

class Profile extends Component {

    constructor() {
        super()
        this.state = {
            userRecipes: [],
            showForm: false,
            showDelete: false
        }

        this.recipeService = new RecipeService ()
        this.authService = new AuthService ()
        this.commentsService = new CommentsService ()
        this.ratingsService = new RatingsService ()
    }

    componentDidMount() {
        this.loadUserRecipes()
    }

    componentDidUpdate() {
        localStorage.getItem("userRecipesScrollPosition") && window.scrollTo(0, localStorage.getItem("userRecipesScrollPosition"))
    }

    componentWillUnmount() {
        localStorage.setItem("userRecipesScrollPosition", window.scrollY)
    }

    loadUserRecipes() {

        this.recipeService
            .getUserRecipes(this.props.loggedUser._id)
            .then(response => this.setState({userRecipes: response.data}))
            .catch(err => this.props.handleAlert(true, 'Error', 'Error loading recipes'))
    }

    togglemodalForm(value) {
        this.setState({showForm: value})
    }

    deleteAccount() {

        const user = this.authService.deleteUser(this.props.loggedUser._id)
        const comments = this.commentsService.deleteCommentsByUser(this.props.loggedUser._id)
        const ratings = this.ratingsService.deleteRatingsByUser(this.props.loggedUser._id)
        const recipes = this.recipeService.deleteRecipesByUser(this.props.loggedUser._id)
        

        Promise
            .all([user, comments, ratings, recipes])
            .then(responsesArr => {
                this.props.handleAlert(true, 'Alert', responsesArr[0].data.message)
                this.props.history.push('/')
                this.props.refreshUser()
            })
            .catch(() => this.props.handleAlert(true, 'Error', 'Error removing user'))
    }

    togglemodalDelete(value) {
        this.setState({showDelete: value})
    }
    
    render () {
        return (
            <>
                
                <Row className='justify-content-center user-recipes'>
          
                    <Col lg={2} md={3} xs={4} className='avatar-section '>
                        <Container>
                            <Row className='avatar-row justify-content-center'>

                            <header className='header'>
                                <img className='profile-img' src={this.props.loggedUser.image.url} alt={this.props.loggedUser.image.alt}></img>
                                <h1>Hi, {this.props.loggedUser.username}! </h1>
                                <Link to={`edit-user/${this.props.loggedUser._id}`} className='btn edit-recipe-btn' >Edit Profile</Link>
                            </header>
                            </Row>
                        </Container>
                    </Col>
          
                    <Col lg={12} md={12} xs={12}>
                        <Container>
                        
                        <h1>My recipes</h1>
                            <div>
                                <Button onClick={() => this.togglemodalForm(true)} className='new-recipe-btn'>New Recipe</Button>
                            </div>

                        <UserRecipesList handleAlert={this.props.handleAlert} userRecipes={this.state.userRecipes} refreshList={() => this.loadUserRecipes()} ></UserRecipesList>                        
                        </Container>
                    </Col>
                    <Button onClick={() => this.togglemodalDelete(true)} className='btn delete-btn delete-user-btn'>Delete User</Button>
                </Row>
    

                <Modal show={this.state.showForm} onHide={() => this.togglemodalForm(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>New recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RecipeForm loggedUser={this.props.loggedUser} closeModal={() => this.togglemodalForm(false)} refreshList={() => this.loadUserRecipes()} handleAlert={this.props.handleAlert} />
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showDelete} onHide={() => this.togglemodalDelete(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                                <Button className='btn delete-btn' onClick={() => this.deleteAccount()}>Delete Account</Button>
                        
                    </Modal.Body>
                </Modal>
                

            </>
        )
    }
    
}

export default Profile