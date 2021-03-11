import {Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './Home.css'


const Home = () => {
    return (
        <>
            <section className='hero'>
                <Container className='d-flex align-items-center justify-content-center'>
                    <Row className='justify-content-center align-items-center'>
                        <Col>
                            <h1>Welcome to Nutrinfo</h1>
                            <h5>Get all the info you need from your own recipes!</h5>  
                            <Link className='btn' to='/signup'>Signup!</Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Home