import { Link } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'

const RecipeCard = ({image, title, _id}) => {
    return (
        <Col lg={4}>
            <Card>
                <Card.Img variant="top" src={image[0]?.url}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Link to={`/recipe-details/${_id}`} className='button button-small'>See details</Link> 
                </Card.Body>
            </Card>
        </Col>
        )
}

export default RecipeCard