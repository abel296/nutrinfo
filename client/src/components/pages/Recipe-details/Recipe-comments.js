import { Col, Row } from 'react-bootstrap'

const RecipeComments = ({recipeComments}) => {
    return (
        <Row>
            {recipeComments.map(elm => {
                return (
                <Col xl={12}>
                <h6>{elm.owner.username}</h6>
                <p>{elm.text}</p>
                <hr />
                </Col>
                )    
            })
            }  
        </Row>
         
        )
}

export default RecipeComments