import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Cart from 'react-bootstrap-icons/dist/icons/cart';
import Cash from 'react-bootstrap-icons/dist/icons/cash-coin';
import Login from 'react-bootstrap-icons/dist/icons/person-x';
import Person from 'react-bootstrap-icons/dist/icons/person';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserContext from '../context/user-context';

const Menu = () => {
  const {user} = useContext(UserContext);

  // PROTECTED ROUTE USE UserContext
  // https://blog.devgenius.io/how-to-add-authentication-to-a-react-app-26865ecaca4b
  // https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
  const AdminMenu = () => {
    return (
      <>
        <NavDropdown.Divider />
        <NavDropdown align='end' title='Admin' as={Nav}>
          <NavDropdown.Item as={NavLink} to='/catalog/add'>Add Product</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to='/customer/add'>Add Customer</NavDropdown.Item>
        </NavDropdown>
      </>
    );
  }

  return (
    <Navbar bg='light' style={{height: '10vh'}} data-bs-theme='light'>
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          <img src='/logo.svg' alt='Warehouse React &copy;' width='30' height='30'/>
          Warehouse React
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={NavLink} to='/deal' title='Deals'><Cash className='fs-3' /></Nav.Link>
          { user
              ? <NavDropdown align='end' title={<Person className='fs-3'/>} as={Nav}>
                  <NavDropdown.Item as={NavLink} to='/contact-warehouse'>Profile</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to='/account'>Account</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to='/history'>History</NavDropdown.Item>
                  {user.admin && <AdminMenu />}
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to='/sign-out'>Sign Out</NavDropdown.Item>
                </NavDropdown>
              : <Nav.Link as={NavLink} to='/sign-in'><Login className='fs-3' /></Nav.Link>
          }
          <Nav.Link as={NavLink} to='/cart-review'><Cart className='fs-3' /></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Menu;