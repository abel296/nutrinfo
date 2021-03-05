import { Row, Col } from 'react-bootstrap'


const RecipeIngredients = ({image, ingredients, labels, diet}) => {
    return (
        <Row>
            <Col m d={6}>
                <img src={image[0].url} alt={image[0].alt} />
                <h5>Ingredients</h5>
                <ul>
                    {ingredients.map(elm => <li key={elm._id}><strong>{elm.name}</strong>: {elm.quantity}</li>)}
                </ul>
            </Col>
            <Col>
                {labels.map((elm, idx)=> <span key={idx}>{elm} </span>)}
                <h6>{diet}</h6>
            </Col>
        </Row>
         
        )
}

export default RecipeIngredients