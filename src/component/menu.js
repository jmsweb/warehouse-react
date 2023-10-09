import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Cart from 'react-bootstrap-icons/dist/icons/cart';
import Person from 'react-bootstrap-icons/dist/icons/person';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserContext from '../context/user-context';

const Menu = () => {
  const {user} = useContext(UserContext);

  return (
    <Navbar bg='light' style={{height: '10vh'}} data-bs-theme='light'>
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          <img src='/logo.svg' alt='Warehouse React &copy;' width='30' height='30'/>
          Warehouse React
        </Navbar.Brand>
        <p>{user && `${user.email} (${user.admin ? 'Admin' : 'Customer'})`}</p>
        <Nav>
          <Nav.Link as={NavLink} to='/deal' title='Deals'>Deals</Nav.Link>
          { user
              ? <NavDropdown title={<Person className='fs-3'/>} as={Nav}>
                  <NavDropdown.Item as={NavLink} to="/contact-warehouse">Profile</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/account">Account</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/history">History</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/catalog/add">Add Product</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/sign-out">Sign Out</NavDropdown.Item>
                </NavDropdown>
              : <Nav.Link as={NavLink} to='/sign-in'>Sign in</Nav.Link>
          }
          <Nav.Link as={NavLink} to='/cart-review'>
            <Cart className='fs-3'/>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Menu;