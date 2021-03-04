import { Col } from 'react-bootstrap'

const RecipeComment = (props) => {
    return (
            <Col xl={12}>
                <h6>{props.owner.username}</h6>
                <p>{props.text}</p>
                <hr />
            </Col>
         
        )
}

export default RecipeComment