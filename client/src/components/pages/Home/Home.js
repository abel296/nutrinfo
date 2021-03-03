import {Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './Home.css'


const Home = () => {
    return (
        <>
            <section className='hero'>
                <Container className='d-flex align-items-center justify-content-center'>
                    <Row className='justify-content-center'>
                        <Col>
                            <h1>Welcome to Nutrinfo</h1>
                            <h5>Get all the info you need from your own recipes!</h5>  
                            <Link className='btn btn-white btn-transparent' to='/signup'>Signup!</Link>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='more-info'>
                <Row>
                    <Col className='community'>
                        <h2>Check out all the recipes from our community</h2>
                    </Col>

                    <Col>
                        <h2>Don't know what goes here yet</h2>
                    </Col>

                </Row>
            </section>
        </>
    )
}

export default Home