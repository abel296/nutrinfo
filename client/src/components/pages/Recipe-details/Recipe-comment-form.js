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

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({[name]: value})
    }

    handleSubmit(e) {

        e.preventDefault()
        
        this.commentsService
            .createComment(this.props.param, this.state)
            .then(() => {
                this.setState({text: ''}, () => this.props.refreshList())
                
            })
            .catch(err => console.log(err))
    }
    
    render() {
        
        return (
    
            <Form onSubmit={e => this.handleSubmit(e)}>
                <Form.Group controlId="commentTextArea">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" rows={3} type='text' name='text' value={this.state.text} onChange={e => this.handleInputChange(e)} />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
             
            )
    }
}

export default RecipeCommentForm