import React, { useContext } from 'react';
import Facebook from 'react-bootstrap-icons/dist/icons/facebook';
import Twitter from 'react-bootstrap-icons/dist/icons/twitter';
import Instagram from 'react-bootstrap-icons/dist/icons/instagram';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import UserContext from '../context/user-context';

const Footer = () => {
  const {user} = useContext(UserContext);

  const onClick = () => {
    (async () => {
      await fetch(process.env.WAREHOUSE_API + '/api/v1/auth/verify', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.log(error))
    })();
  }

  return (
    <footer className='footer bg-light pt-4' style={{ minHeight: '30vh'}}>
      <Container>
        <Row>
          <Col>
            <Navbar.Brand>
              <Nav>
                <ListGroup horizontal={'lg'} className='mb-3'>
                  <Nav.Link as={NavLink} to='/about-us'>About</Nav.Link>
                  <Nav.Link as={NavLink} to='/contact-warehouse'>Contact</Nav.Link>
                  <Nav.Link as={NavLink} to='/register'>Registration</Nav.Link>
                  <Nav.Link as={NavLink} to='/term-of-use' className={'text-nowrap'}>Term of Use</Nav.Link>
                  <Nav.Link as={NavLink} to='/privacy-policy' className={'text-nowrap'}>Privacy Policy</Nav.Link>
                  <Nav.Link as={NavLink} onClick={onClick} className='col-md-2'>Verify</Nav.Link>
                </ListGroup>
              </Nav>
            </Navbar.Brand>
          </Col>
          <Col>
            <Nav className='float-end'>
              <NavLink href='#!' className='p-2'><Facebook className='fs-3' /></NavLink>
              <NavLink href='#!' className='p-2'><Twitter className='fs-3' /></NavLink>
              <NavLink href='#!' className='p-2'><Instagram className='fs-3' /></NavLink>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <pre>{user && `${user.email} (${user.admin ? 'Admin' : 'Customer'})`}</pre>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;