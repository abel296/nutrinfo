import { Component } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
import AuthService from '../../../service/auth.service'


class Signup extends Component {
    
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }

        this.authService = new AuthService()
    }

    handleInputChange(e) {
        const {name, value} = e.target
        this.setState({ [name]: value })
    }

    handleSubmit(e) {

        e.preventDefault()

        this.authService
            .signup(this.state)
            .then(response => {
                this.props.storeUser((response.data))
                this.props.history.push('/')
            })
            .catch(err => console.log({err}))
    }



    render() {
        return(
            <Container>

                <Row>

                    <Col md={{span: 4, offset: 4}}>

                        <h1>Signup</h1>
                        <hr></hr>

                        <Form onSubmit={e => this.handleSubmit(e)}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name='username' value={this.state.username} onChange={e => this.handleInputChange(e)} />
                            <Form.Text className="text-muted">
                            Do you already have an account?  <Link to='/login'>Log In here!</Link>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' value={this.state.password} onChange={e => this.handleInputChange(e)} />
                        </Form.Group>
                        <Button variant="dark" block type="submit">Submit</Button>
                        </Form>

                    </Col>

                </Row>

        </Container>
        )
    }
}

export default Signup