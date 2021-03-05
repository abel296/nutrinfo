import { Row, Col } from 'react-bootstrap'

import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter'
import ordinalNumber from '../../../utils/ordinalNumber'


const RecipeSteps = ({steps}) => {
    return (
            <Row>
                <Col>
                    <h5>Steps</h5>
                    <ul>
                        {steps.map(elm =><li key={elm._id}><strong>{ordinalNumber(elm.number)}</strong> {capitalizeFirstLetter(elm.step)}</li>)}
                    </ul>
                </Col>
            </Row>
        )
}

export default RecipeSteps