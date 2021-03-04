import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
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
                            &&
                            <>
                                <NavLink to='/signup'>
                                    <Nav.Link as='span'>Signup</Nav.Link>
                                </NavLink>

                                <NavLink to='/login'>
                                    <Nav.Link as='span'>Login</Nav.Link>
                                </NavLink>
                            </>
                            
                    }        
                    
                    {/* <NavLink to='/profile'>
                        <Nav.Link as='span'>Welcome {loggedUser ? loggedUser.username : 'guess'} </Nav.Link>
                    </NavLink> */}
                    
                    
                    {
                        loggedUser
                            &&
                    <NavDropdown alignRight={true} title={loggedUser.username} id="basic-nav-dropdown">
                    {/* <NavDropdown alignRight={true} title="Profile" id="basic-nav-dropdown"> */}
                        <NavDropdown.Item as='span'>
                            <NavLink to='/profile'>
                                <Nav.Link as='span'>Profile</Nav.Link>
                            </NavLink>
                        </NavDropdown.Item>
                        <NavDropdown.Item as='span'>
                            <Nav.Link as='span' onClick={() => logoutUser()} >Logout</Nav.Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                    }

                </Nav>
            </Navbar.Collapse>

            
        </Navbar>  
    )
}

export default Navigation