import { Row, Col } from 'react-bootstrap'


const RecipeSteps = ({steps}) => {
    return (
            <Row>
                <Col>
                    <h5>Steps</h5>
                    <ul>
                        {steps.map(elm =><li key={elm._id}><strong>{elm.number}</strong> {elm.step}</li>)}
                    </ul>
                </Col>
            </Row>
        )
}

export default RecipeSteps