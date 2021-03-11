import { Col, Row } from 'react-bootstrap'

const RecipeComments = ({recipeComments}) => {
    return (
        <Row>
            {recipeComments.map(elm => {
                return (
                <Col className='comment' xl={12}>
                    <div>
                        <img src={elm.owner.image.url} alt={elm.owner.image.alt} />
                        <h6>{elm.owner.username}</h6>
                    </div>
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