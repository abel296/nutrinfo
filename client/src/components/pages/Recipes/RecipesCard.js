import { Link } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'

const RecipeCard = (props) => {
    return (
        <Col lg={4}>
            <Card>
                <Card.Img variant="top" src={props.image[0].url}/>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Link to={`/recipe-details/${props._id}`} className='btn btn-small'>See details</Link> 
                </Card.Body>
            </Card>
        </Col>
        )
}

export default RecipeCard