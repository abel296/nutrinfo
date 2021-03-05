import { Component } from 'react'

import RecipeService from '../../../service/recipes.service'
import EdamamService from '../../../service/edamam.service'
import { Container, Form, Button, Row, Col, ListGroup} from 'react-bootstrap'

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
            nutrients: [],
            steps: [],
            time: 0,
            servings: 0,
            // diet: [],
            // rating: [],
            // labels: [],
            owner: '' // ?????????????
        }

        this.recipeService = new RecipeService()
        this.edamamService = new EdamamService()
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

        // const {title, ingredients} = this.state

        e.preventDefault()

        const promisesArr = this.state.ingredients
        .map(ing => this.edamamService.getIngredientInfo(ing.name, ing.quantity, ing.unit).then(response => response.data))
       
        Promise.all(promisesArr)
        .then(allIngredients => {
            const nutrientsArr = allIngredients.reduce((acc, elm) => {

                acc[0].quantity += elm.totalNutrients.ENERC_KCAL.quantity
                acc[1].quantity += elm.totalNutrients.FAT.quantity
                acc[2].quantity += elm.totalNutrients.CHOCDF.quantity
                acc[3].quantity += elm.totalNutrients.PROCNT.quantity

                return acc

            } , [{label:'Energy',quantity: 0, unit:'kcal'},{label:'Fat',quantity: 0, unit:'g'},{label:'Carbs',quantity: 0, unit:'g'},{label:'Protein',quantity: 0, unit:'kcal'}])
           
            const labelsArr =  allIngredients.reduce((acc, eachIng, idx) => {
                const newAcc = [...acc]
                acc.forEach( label => !eachIng.healthLabels.includes(label) && newAcc.splice(idx, 1) )
                return newAcc
            }, allIngredients[0].healthLabels)

            this.setState({nutrients: nutrientsArr})
        })
        .catch(err => console.log(err))
        // this.state.ingredients.forEach((ingredient) => {
        //     this.edamamService
        //         .getIngredientInfo(ingredient.name, ingredient.quantity, ingredient.unit)
        //         .then(response => {
        //             console.log("en ello...")
                    
        //             if (nutrientsArr.length === 0) {

        //                 //nutrients
        //                 nutrientsArr.push(response.data.totalNutrients.ENERC_KCAL)
        //                 nutrientsArr.push(response.data.totalNutrients.FAT)
        //                 nutrientsArr.push(response.data.totalNutrients.CHOCDF)
        //                 nutrientsArr.push(response.data.totalNutrients.PROCNT)

        //                 //labels
        //                 labelsArr.push(...response.data.healthLabels)
                        
        //             } else {

        //                 //nutrients
        //                 nutrientsArr[0].quantity += response.data.totalNutrients.ENERC_KCAL.quantity
        //                 nutrientsArr[1].quantity += response.data.totalNutrients.FAT.quantity
        //                 nutrientsArr[2].quantity += response.data.totalNutrients.CHOCDF.quantity
        //                 nutrientsArr[3].quantity += response.data.totalNutrients.PROCNT.quantity

                        
        //                 const labelsToPush = []
        //                 //labels
        //                 labelsArr.forEach((label, idx) => {
        //                     if (!response.data.healthLabels.includes(label)){
        //                         const IndexOfLabel = labelsArr.indexOf(label)
        //                         labelsArr.splice(IndexOfLabel, 1)
        //                     } else {
        //                         labelsToPush.push(response.data.healthLabels[idx])
        //                     }
        //                 })
                        
        //                 labelsArr.push(...labelsToPush)
                        
        //             }

        //         })
        //         .catch(err => console.log({err}))   
      // })

        
        

        // this.recipeService
        //     .createRecipe({title, ingredients})
        //     .then(response => console.log(response))
        //     .catch(err => console.log({err}))   
        
    }

    render() {
        return(
            <Container>

                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={this.state.title} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col >
                                <Form.Label>Ingredient</Form.Label>                            
                                <Form.Control type="text" name="name" value={this.state.ingToPush.name} onChange={e => this.handleIngredientInputChange(e)}/>
                            </Col>
                            <Col md={{span: 2}}>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" name="quantity" value={this.state.ingToPush.quantity} onChange={e => this.handleIngredientInputChange(e)}/>
                            </Col>
                            <Col md={{span: 2}}>
                                {/* <Form.Label>Unit</Form.Label>
                                <Form.Control type="text" name="unit" value={this.state.ingToPush.unit} onChange={e => this.handleIngredientInputChange(e)}/> */}
                                <Form.Label>Unit</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    id="inlineFormCustomSelect"
                                    name="unit"
                                    custom
                                    onChange={e => this.handleIngredientInputChange(e)}
                                >
                                    <option value=''>Choose...</option>
                                    <option value='g' >g</option>
                                    <option value='Kg' >kg</option>
                                    <option value='l' >l</option>
                                    <option value='ml' >ml</option>
                                </Form.Control>
                            </Col>

                            <Col className='d-flex' md={{span: 2}}>
                                <Button onClick={() => this.addIngredient()} variant="dark"  type="button">Add ingredient</Button>
                            </Col>
                        </Row>
                            <Col Col >
                                <ListGroup variant="flush">
                                        {this.state.ingredients?.map(elm =><ListGroup.Item>{elm.name} {elm.quantity}{elm.unit}</ListGroup.Item>)}   
                                </ListGroup>
                            </Col>
                    </Form.Group>
                    
                    <Button variant="dark" block type="submit">New Recipe</Button>
                    
                </Form>
            </Container>
        )
    }
}

export default RecipeForm