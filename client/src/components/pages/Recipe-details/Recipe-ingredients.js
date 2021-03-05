import { Row, Col } from 'react-bootstrap'

import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter'


const RecipeIngredients = ({image, ingredients, labels, diet}) => {
    return (
        <Row>
            <Col m d={6}>
                {image[0] && <img src={image[0].url} alt={image[0].alt} />}
                
                
                <h5>Ingredients</h5>
                <ul>
                    {ingredients.map(elm => <li key={elm._id}><strong>{capitalizeFirstLetter(elm.name)}</strong>: {elm.quantity}</li>)}
                </ul>
            </Col>
            <Col>
                {labels && labels.map((elm, idx)=> <span key={idx}>{capitalizeFirstLetter(elm)} </span>)}
                <h6>{diet && capitalizeFirstLetter(diet)}</h6>
            </Col>
        </Row>
         
        )
}

export default RecipeIngredients