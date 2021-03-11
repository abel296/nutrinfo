import { Link } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
import './RecipeCard.css'

const RecipeCard = ({image, title, _id}) => {
    return (
        <Col lg={4} md={6} xs={12}>
            <Card>
            <div className='card-image-wrapper'>
                <Card.Img className='card-image' variant="top" src={image?.url}/>
            </div>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Link to={`/recipe-details/${_id}`} className='btn'>See details</Link> 
                </Card.Body>
            </Card>
        </Col>
        )
}

export default RecipeCard