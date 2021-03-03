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
                            <Link className='button button-white button-transparent' to='/signup'>Signup!</Link>
                        </Col>
                    </Row>
                </Container>
            </section>

            <div>
            <Row className='info-block'>
                <Col className='community-col' lg={6} md={12}>
                <section className='community-section'>
                    <div>
                        <h2>Community</h2>
                        <h5>Check all the recipes from our community!</h5>
                        <Link className='button button-white button-transparent' to='/recipes'>Recipes</Link>
                    </div>
                </section>
                </Col>
                <Col className='other-col' lg={6} md={12}>
                <section className='other-section'>
                    <div>
                        <h2>Community</h2>
                        <h5>Check all the recipes from our community!</h5>
                        <Link className='button button-white button-transparent' to='/recipes'>Recipes</Link>
                    </div>
                </section>
                </Col>
            </Row>
            </div>
        </>
    )
}

export default Home