import { Component } from 'react'
import RecipeForm from "../Recipe-form/Recipe-form"
import UserRecipesList from "./UserRecipesList"
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import './Profile.css'

import RecipeService from '../../../service/recipes.service'
import { Link } from 'react-router-dom'

class Profile extends Component {

    constructor() {
        super()
        this.state = {
            userRecipes: [],
            showForm: false
        }

        this.recipeService = new RecipeService ()
    }

    componentDidMount() {
        this.loadUserRecipes()
    }

    loadUserRecipes() {

        this.recipeService
            .getUserRecipes(this.props.loggedUser._id)
            .then(response => this.setState({userRecipes: response.data}))
            .catch(err => console.log({err}))
    }

    togglemodalForm(value) {
        this.setState({showForm: value})
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

                        <UserRecipesList userRecipes={this.state.userRecipes} refreshList={() => this.loadUserRecipes()} ></UserRecipesList>                        
                        </Container>
                    </Col>
                </Row>
    

                <Modal show={this.state.showForm} onHide={() => this.togglemodalForm(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>New recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RecipeForm loggedUser={this.props.loggedUser} closeModal={() => this.togglemodalForm(false)} refreshList={() => this.loadUserRecipes()} handleAlert={this.props.handleAlert} />
                    </Modal.Body>
                </Modal>

            </>
        )
    }
    
}

export default Profile