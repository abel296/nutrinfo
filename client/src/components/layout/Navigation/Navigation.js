import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import "./Navigation.css"
import { NavLink } from 'react-router-dom'

const Navigation = () => {

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
                
                    <NavLink to='/signup'>
                        <Nav.Link as='span'>Signup</Nav.Link>
                    </NavLink>

                    <NavLink to='/login'>
                        <Nav.Link as='span'>Login</Nav.Link>
                    </NavLink>
                    
                    <NavDropdown alignRight={true} title="Profile" id="basic-nav-dropdown">
                        <NavDropdown.Item as='span'>
                            <NavLink to='/profile'>
                                <Nav.Link as='span'>Profile</Nav.Link>
                            </NavLink>
                        </NavDropdown.Item>

                        <NavDropdown.Item as='span'>
                            <NavLink to='/logout'>
                                <Nav.Link as='span'>Logout</Nav.Link>
                            </NavLink>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>

            
        </Navbar>  
    )
}

export default Navigation