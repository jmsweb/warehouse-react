import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Cart } from 'react-bootstrap-icons';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: ''
        };
    }

    componentDidMount() {
        console.log('menu mounted');
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
                        <Nav.Link as={NavLink} to='/sign-in'>Sign in</Nav.Link>
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