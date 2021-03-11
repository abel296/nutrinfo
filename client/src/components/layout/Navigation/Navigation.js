import { Navbar, Nav } from 'react-bootstrap'
import "./Navigation.css"
import { NavLink } from 'react-router-dom'
import logo from './logo_large.png'

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
        <Navbar expand="lg" className='navigation-bar' style={{marginBottom: 30}}>
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

                    <NavLink style={{textDecoration: 'none'}} to='/recipes'>
                        <Nav.Link className='navbar-link' as='span'>Recipes list</Nav.Link>
                    </NavLink>

                    {
                        !loggedUser
                            ?
                            <>

                                <NavLink style={{textDecoration: 'none'}} to='/login'>
                                    <Nav.Link className='navbar-link' as='span'>Login</Nav.Link>
                                </NavLink>
                                <NavLink style={{textDecoration: 'none'}} to='/signup'>
                                    <Nav.Link as='span' className='navbar-link'>Signup</Nav.Link>
                                </NavLink>
                            </>
                            :
                            <>
                            <NavLink style={{textDecoration: 'none'}} className='user-nav' to='/profile'>
                                <img className='nav-img' src={loggedUser.image.url} alt={loggedUser.image.alt}></img>
                                
                                <Nav.Link href='/profile' className='navbar-link'>{loggedUser.username}</Nav.Link>
                            </NavLink>

                            <Nav.Link className='navbar-link' onClick={() => logoutUser()} >Logout</Nav.Link>
                            </>
                    }

                </Nav>
            </Navbar.Collapse>

            
        </Navbar>  
    )
}

export default Navigation