import { Component } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { Link } from 'react-router-dom'
import AuthService from '../../../service/auth.service'


class Login extends Component {
    
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
            .login(this.state)
            .then(response => {
                this.props.storeUser((response.data))
                this.props.history.push('/')
            })
            .catch(err => this.props.handleAlert(true, 'Error', err.response.data.message))
    }



    render() {
        return(
            <Container>

                <Row>

                    <Col md={{span: 4, offset: 4}}>

                        <h1>Login</h1>
                        <hr></hr>

                        <Form onSubmit={e => this.handleSubmit(e)}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name='username' value={this.state.username} onChange={e => this.handleInputChange(e)} />
                            <Form.Text className="text-muted">
                            Don't you have an account? <Link to='/login'>Signup here!</Link>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' value={this.state.password} onChange={e => this.handleInputChange(e)} />
                        </Form.Group>
                        <Button block type="submit">Submit</Button>
                        </Form>

                    </Col>

                </Row>

        </Container>
        )
    }
}

export default Login