import { Row, Col } from 'react-bootstrap'

import DoughnutChart from './Doughnut-chart'

import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter'


const RecipeIngredients = ({image, ingredients, labels, diet,nutrients}) => {
    return (
        <Row>
            <Col lg={6}>
                {image && <img className='recipe-img' src={image.url} alt={image.alt} />}
                
                
                <h5>Ingredients</h5>
                <ul>
                    {ingredients.map(elm => <li key={elm._id}><strong>{capitalizeFirstLetter(elm.name)}</strong>: {elm.quantity} {elm.unit}</li>)}
                </ul>
            </Col>
            <Col lg={6}>
                <h4>Nutrients</h4>
                <DoughnutChart title='Nutrients' data={nutrients} />
                <Row>
                    {labels && labels.map((elm, idx)=> {
                        return (
                        <Col md={4} xs={6} key={idx}>
                            <p className='health-labels' >
                                {capitalizeFirstLetter(elm)} 
                            </p>
                        </Col>
                        )
                        })}
                </Row>
            </Col>
        </Row>
         
        )
}

export default RecipeIngredients