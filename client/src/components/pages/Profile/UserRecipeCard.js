import { Link } from 'react-router-dom'
import { Col, Card, Button, Modal } from 'react-bootstrap'
import './UserRecipeCard.css'

import RecipeService from '../../../service/recipes.service'
import { Component } from 'react'

class UserRecipeCard extends Component {
    constructor() {
        super()
        this.state = {
            showDeleteRecipe: false
        }
    }

    deleteUserCard = () => {
        const recipeService = new RecipeService()

        recipeService
            .deleteRecipe(this.props._id)
            .then(() => this.props.refreshList())
            .catch(err => this.props.handleAlert(true, 'Error', 'Error removing recipe'))
    }

    togglemodalDelete(value) {
        this.setState({ showDeleteRecipe: value })
    }

    render() {
        return (
            <>
                <Col lg={ 4 } md={ 6 } xs={ 12 }>
                    <Card className='user-card'>
                        <div className='card-image-wrapper'>
                            <Card.Img className='card-image' variant="top" src={ this.props.image?.url } />
                        </div>
                        <Card.Body>
                            <Card.Title>{ this.props.title }</Card.Title>
                            <div className='profile-btn'>
                                <Link to={ `/recipe-details/${ this.props._id }` } className='btn profile-details-btn'>See details</Link>
                                <Button onClick={ () => this.togglemodalDelete(true) } className='profile-details-btn delete-btn'>Delete Recipe</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Modal show={ this.state.showDeleteRecipe } onHide={ () => this.togglemodalDelete(false) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex justify-content-between'>
                        <Button className='btn delete-btn' onClick={ () => this.deleteUserCard() }>Delete Recipe Permanently</Button>
                        <Button className='btn' onClick={ () => this.togglemodalDelete(false) }>Cancel</Button>

                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default UserRecipeCard