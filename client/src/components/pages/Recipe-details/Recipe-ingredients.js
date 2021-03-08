import { Row, Col } from 'react-bootstrap'

import DoughnutChart from './Doughnut-chart'

import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter'


const RecipeIngredients = ({image, ingredients, labels, diet,nutrients}) => {
    return (
        <Row>
            <Col md={6}>
                {image && <img src={image.url} alt={image.alt} />}
                
                
                <h5>Ingredients</h5>
                <ul>
                    {ingredients.map(elm => <li key={elm._id}><strong>{capitalizeFirstLetter(elm.name)}</strong>: {elm.quantity}</li>)}
                </ul>
            </Col>
            <Col>
                <DoughnutChart title='Nutrients' data={nutrients} />
                {labels && labels.map((elm, idx)=> <span key={idx}>{capitalizeFirstLetter(elm)} </span>)}
                <h6>{diet && capitalizeFirstLetter(diet)}</h6>
            </Col>
        </Row>
         
        )
}

export default RecipeIngredients