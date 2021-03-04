import { Component } from 'react'
import RecipeService from '../../../service/recipes.service'
import { Container, Form, Button, Row, Col, ListGroup } from 'react-bootstrap'

class RecipeForm extends Component {

    constructor() {
        super()
        this.state = {
            image: [],
            title: '',
            ingredients: [],
            ingToPush: {
                name: '',
                quantity: 0,
                unit: ''
            },
            // nutrients: [],
            steps: [],
            time: 0,
            servings: 0,
            // diet: [],
            // rating: [],
            // labels: [],
            owner: '' // ?????????????
        }

        this.recipeService = new RecipeService()
    }

    handleInputChange(e) {
        const {name, value} = e.target
        this.setState( {[name]: value })
    }

    handleIngredientInputChange(e) {
        const {name, value} = e.target 
        this.setState( { ingToPush: {...this.state.ingToPush, [name]: value} })
    }

    addIngredient() {
        this.setState({ingredients: [...this.state.ingredients, this.state.ingToPush]})
    }
    

    handleSubmit(e) {

        const {title, ingredients} = this.state

        e.preventDefault()

        this.recipeService
            .createRecipe({title, ingredients})
            .then(response => console.log(response))
            .catch(err => console.log({err}))   
        
    }

    render() {
        return(
            <Container>

                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={this.state.title} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                        <ListGroup>                    
                                {this.state.ingredients?.map(elm =><p>{elm.name}{elm.quantity}{elm.unit}</p>)}                     
                        </ListGroup>
                    <Form.Group>
                    <Row>
                        <Col md={{span: 6}} >
                            <Form.Label>Ingredient</Form.Label>                            
                            <Form.Control type="text" name="name" value={this.state.ingToPush.name} onChange={e => this.handleIngredientInputChange(e)}/>
                            

                        </Col>
                        <Col>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" name="quantity" value={this.state.ingToPush.quantity} onChange={e => this.handleIngredientInputChange(e)}/>
                        </Col>
                        <Col>

                            <Form.Label>Unit</Form.Label>
                            <Form.Control type="text" name="unit" value={this.state.ingToPush.unit} onChange={e => this.handleIngredientInputChange(e)}/>

                            {/* <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                            >
                                <option value="0">Choose...</option>
                                <option name="unit" value='g' onChange={e => this.handleIngredientInputChange(e)}>g</option>
                                <option name="unit" value='Kg' onChange={e => this.handleIngredientInputChange(e)}>Kg</option>
                                <option name="unit" value='l' onChange={e => this.handleIngredientInputChange(e)}>l</option>
                                <option name="unit" value='ml' onChange={e => this.handleIngredientInputChange(e)}>ml</option>
                            </Form.Control> */}
                        </Col>
                    </Row>
                        
                        <Button style={{marginTop: 10}} onClick={() => this.addIngredient()} variant="dark"  type="button">Add ingredient</Button>
                    </Form.Group>
                    
                    <Button variant="dark" block type="submit">New Recipe</Button>
                    
                </Form>
            </Container>
        )
    }
}

export default RecipeForm