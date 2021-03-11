import { Navbar, Nav } from 'react-bootstrap'
import "./Navigation.css"
import { NavLink } from 'react-router-dom'
import logo from './logo_white_large.png'

import AuthService from '../../../service/auth.service'

const Navigation = ({storeUser, loggedUser, refreshUser}) => {

    const authService = new AuthService()

    const logoutUser = () => {

        authService
            .logOut()
            .then(() => {
                storeUser(null)
            })
            .catch(err => console.log({err}))
        
    }

    return (
        <Navbar expand="lg" className='navigation-bar'variant="dark" style={{marginBottom: 30}}>
            <NavLink to='/'>
                <Navbar.Brand> <img 
                    alt=""
                    src={logo}

                    className="d-inline-block align-top logo-nav"
                />{' '}</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto nav-rightside">

                    <NavLink to='/recipes'>
                        <Nav.Link as='span'>Recipes list</Nav.Link>
                    </NavLink>

                    {
                        !loggedUser
                            ?
                            <>

                                <NavLink to='/login'>
                                    <Nav.Link className='links-nav' as='span'>Login</Nav.Link>
                                </NavLink>
                                <NavLink to='/signup'>
                                    <Nav.Link as='span'>Signup</Nav.Link>
                                </NavLink>
                            </>
                            :
                            <>
                            <NavLink className='user-nav' to='/profile'>
                                <img className='nav-img' src={loggedUser.image.url} alt={loggedUser.image.alt}></img>
                                
                                <Nav.Link as='span'>{loggedUser.username}</Nav.Link>
                            </NavLink>

                            <Nav.Link onClick={() => logoutUser()} >Logout</Nav.Link>
                            </>
                    }

                </Nav>
            </Navbar.Collapse>

            
        </Navbar>  
    )
}

export default Navigation