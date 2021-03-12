import { Row, Col } from 'react-bootstrap'

import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter'
import ordinalNumber from '../../../utils/ordinalNumber'


const RecipeSteps = ({steps, time}) => {
    return (
            <Row>
                <Col>
                    <h5>Steps</h5>
                    <ul>
                        {steps.map(elm =><li key={elm._id}><strong>{ordinalNumber(elm.number)}</strong> {capitalizeFirstLetter(elm.step)}</li>)}
                    </ul>
                    <p className='time'><strong>Time:</strong> {time} min</p>
                </Col>
            </Row>
        )
}

export default RecipeSteps