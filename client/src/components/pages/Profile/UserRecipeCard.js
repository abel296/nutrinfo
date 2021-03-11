import { Link } from 'react-router-dom'
import { Col, Card, Button } from 'react-bootstrap'
import './UserRecipeCard.css'

import RecipeService from '../../../service/recipes.service'

const UserRecipeCard = ({image, title, _id, refreshList}) => {

    const recipeService = new RecipeService()

    const deleteUserCard = () => {

        recipeService
            .deleteRecipe(_id)
            .then(() => refreshList())
            .catch(err => console.log(err))
    }


    return (
        <Col lg={4} md={6} xs={12}>
            <Card>
            <div className='card-image-wrapper'>
                <Card.Img className='card-image' variant="top" src={image?.url}/>
            </div>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <div className='profile-btn'>
                        <Link to={`/recipe-details/${_id}`} className='btn profile-details-btn'>See details</Link>
                        <Button onClick={() => deleteUserCard()} className='profile-details-btn delete-btn'>Delete Recipe</Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
        )
}

export default UserRecipeCard