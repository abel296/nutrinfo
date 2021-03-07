import { Navbar, Nav } from 'react-bootstrap'
import "./Navigation.css"
import { NavLink } from 'react-router-dom'

import AuthService from '../../../service/auth.service'

const Navigation = ({storeUser, loggedUser}) => {

    const authService = new AuthService()

    const logoutUser = () => {

        authService
            .logOut()
            .then(() => storeUser(undefined))
            .catch(err => console.log({err}))
        
    }

    return (
        <Navbar expand="lg" className='navigation-bar' bg="dark" variant="dark" style={{marginBottom: 30}}>
            <NavLink to='/'>
                <Navbar.Brand>Nutrinfo</Navbar.Brand>
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
                                <NavLink to='/signup'>
                                    <Nav.Link as='span'>Signup</Nav.Link>
                                </NavLink>

                                <NavLink to='/login'>
                                    <Nav.Link as='span'>Login</Nav.Link>
                                </NavLink>
                            </>
                            :
                            <>
                            <NavLink to='/profile'>
                                <Nav.Link as='span'>{loggedUser.username}</Nav.Link>
                            </NavLink>

                            <Nav.Link as='span' onClick={() => logoutUser()} >Logout</Nav.Link>
                            </>
                    }

                </Nav>
            </Navbar.Collapse>

            
        </Navbar>  
    )
}

export default Navigation