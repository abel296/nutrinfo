import {Component} from 'react'
import { Form, Button } from 'react-bootstrap'
import CommentsService from '../../../service/comments.service'


class RecipeCommentForm extends Component {

    constructor() {
        super()
        this.state = {
            text: ''
        }
        this.commentsService = new CommentsService()
    }

    handleSubmit(e) {

        e.preventDefault()
        const recipe_id = this.props.match.params.recipe_id
        
        this.commentsService
            .createComment(recipe_id, this.state)
            .then(() => this.loadRecipe())
            .catch(err => console.log(err))
    }
    
    render() {
        
        return (
    
            <Form onSubmit={e => this.handleSubmit(e)}>
                <Form.Group controlId="commentTextArea">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" rows={3} type='text' name='text' value={this.state.comment} onChange={e => this.handleInputChange(e)} />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
             
            )
    }
}

export default RecipeCommentForm