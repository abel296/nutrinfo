import {Component} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Spinner from '../../shared/Spinner/Spinner'
import AuthService from '../../../service/auth.service'
import UploadService from '../../../service/upload.service'



class UserForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: this.props.loggedUser.username,
                password: '',
                image: ''
            },
            isUploading: false
        }
        this.authService = new AuthService()
        this.uploadService = new UploadService()

    }

    componentDidMount() {
        // this.setState({user: {...this.state.user, username: this.props.loggedUser.username}})
    }

    handleInputChange(e) {
        const {name, value} = e.target
        this.setState({user: {...this.state.user, [name]: value }})
    }

    handleSubmit(e) {
        e.preventDefault()

        this.authService
            .editUser(this.props.match.params.user_id, this.state.user)
            .then(() => {
                const {username, password} = this.state.user
                return this.authService.login({username, password})
            })
            .then(() => this.props.refreshUser())
            .catch(err => console.log(err))
    }

    handleFileUpload(e) {
        this.setState({ isUploading: true})

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.uploadService
            .uploadFile(uploadData)
            .then(response => {
                this.setState({
                    isUploading: false,
                    user: {...this.state.user, image: {
                        url: response.data.secure_url,
                        alt: this.state.user.username
                    }} 
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return(
            <Container>

                <Row>

                    <Col md={{span: 4, offset: 4}}>

                        <h1>Edit User</h1>
                        <hr></hr>

                        <Form onSubmit={e => this.handleSubmit(e)}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name='username' value={this.state.user.username} onChange={e => this.handleInputChange(e)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' value={this.state.user.password} onChange={e => this.handleInputChange(e)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Image (File) {this.state.isUploading && <Spinner />}</Form.Label>
                            <Form.Control type="file" name="imageUrl" onChange={e => this.handleFileUpload(e)} />
                        </Form.Group>  
                        <Button variant="dark" block type="submit">Submit</Button>
                        </Form>

                    </Col>

                </Row>

        </Container>
        )
    }
}

export default UserForm