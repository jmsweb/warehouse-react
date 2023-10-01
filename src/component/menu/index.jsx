import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Cart, Person } from 'react-bootstrap-icons';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            verified: false
        };
    }

    componentDidMount = async () => {
        await fetch(process.env.WAREHOUSE_API + '/api/v1/auth/verify', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then( response => response.json() )
        .then( data => this.setState({verified: data.success}) )
        .catch( () => this.setState({verified: false}) );
    }

    render() {
        return (
            <Navbar bg='light' style={{height: '10vh'}} data-bs-theme='light'>
                <Container>
                    <Navbar.Brand as={NavLink} to='/'>
                        <img src='/logo.svg' alt='React Warehouse &copy;' width='30' height='30'/>
                        Warehouse React
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link as={NavLink} to='/deal'>Deals</Nav.Link>
                        { this.state.verified
                                ? <NavDropdown title={<Person className='fs-3'/>} as={Nav}>
                                    <NavDropdown.Item href="/contact-warehouse">Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                                    <NavDropdown.Item href="/history">History</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/sign-out">Sign Out</NavDropdown.Item>
                                </NavDropdown> 
                                : <Nav.Link as={NavLink} to='/sign-in'>Sign in</Nav.Link>
                        }
                        <Nav.Link as={NavLink} to='/cart-review'>
                            <i><Cart className='fs-3'/></i>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}

export default Menu;