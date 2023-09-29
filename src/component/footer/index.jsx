import React from 'react';
import { Facebook } from 'react-bootstrap-icons';
import { Twitter } from 'react-bootstrap-icons';
import { Instagram } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ListGroup } from 'react-bootstrap/esm';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: ''
        };
    }

    componentDidMount() {
        console.log('footer mounted');
    }

    render() {
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
                                        <Button onClick={ async () => {
                                            await fetch(`${process.env.WAREHOUSE_API}/health-check`, {
                                                method: 'GET',
                                                credentials: 'include',
                                                headers: {
                                                    'Accept': 'application/json'
                                                }
                                            })
                                            .then(response => response.json())
                                            .then(response => {
                                                this.setState({response: response.warehouse_api}, () => {
                                                    alert(this.state.response);
                                                    console.log(this.state.response);
                                                });
                                            })
                                            .catch((error) => {
                                                this.setState({response: error}, () => {
                                                    alert(this.state.response);
                                                    console.log(this.state.response);
                                                });
                                            });

                                        }} className='col-md-2'>
                                                Verify
                                        </Button>
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
                </Container>
            </footer>
        );
    }
}

export default Footer;