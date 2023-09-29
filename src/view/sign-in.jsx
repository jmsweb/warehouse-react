import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { Facebook } from 'react-bootstrap-icons';
import { Twitter } from 'react-bootstrap-icons';
import { Google } from 'react-bootstrap-icons';
import { Github } from 'react-bootstrap-icons';
 
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form_un: '',
            form_pw: '',
            error: false
        }
        //This has performance benefits as the events aren’t binding every time the method is called,
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        console.log('signin loaded');
    }

    onSubmit = async (event) => {
        event.preventDefault();
        await fetch(
            'http://localhost:81/api/v1/auth/token',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': 'Basic ' + btoa(this.state.form_un + ':' + this.state.form_pw),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => response.json())
        .then(response => {
            if (response.message !== 'OK') {
                throw new Error(response.message);
            }

            // JWT is HttpOnly Cookie (Managed by Browser!) Prevent XSS
            // Store JWT in localStorage, or Redis, Prevent CSRF to validate against HttpOnly cookie
            localStorage.setItem('mike-warehouse', JSON.stringify({ isAuthenticated: true }));
            localStorage.setItem('mike-warehouse-jwt', response.jwt);
            window.location = '/';
        })
        .catch(() => {
            this.setState({
                error: true
            });
        });
    }

    render() {
        return (
            <Container className='p-3' style={{ minHeight: '60vh'}}>
                {this.state.error && <Alert variant='danger' key={1}>Please submit correct credentials.</Alert>}
                <Form onSubmit={this.onSubmit} className='d-flex flex-column w-50 mx-auto mt-4 mb-4' style={{minWidth: '21rem'}}>
                    <Form.Group controlId='form_un' className='mb-4'>
                        <Form.Control type='email' placeholder='Email' />
                    </Form.Group>
                    <Form.Group controlId='form_pw' className='mb-4'>
                        <Form.Control type='password'
                            placeholder='Password'
                            value={this.state.form_pw}
                            onChange={(e) => (
                                this.setState({
                                    form_pw: e.target.value
                                })
                            )}
                        />
                    </Form.Group>
                    
                    <div className='d-flex justify-content-center mx-3 mb-4'>
                        <Form.Group controlId='form_rm' className='p-2'>
                            <Form.Check type='checkbox' label='Remember me' />
                        </Form.Group>
                        <Nav>
                            <NavLink to={'/forgot-password'} className='p-2'>Forgot password?</NavLink>
                        </Nav>
                    </div>
                    <div className='mb-4'>
                        <Form.Group>
                            <Button type='submit' variant='primary' className='w-100'>SIGN IN</Button>
                        </Form.Group>
                    </div>
                    <div className='text-center'>
                        <p>Not a member? <NavLink to={'/register'}>Register</NavLink></p>
                        <p>or sign up with:</p>
                        <div className='d-flex justify-content-center mx-auto'>
                            <NavLink href='#!' className='p-2' style={{width: '3rem'}}><Facebook className='fs-3' /></NavLink>
                            <NavLink href='#!' className='p-2' style={{width: '3rem'}}><Google className='fs-3' /></NavLink>
                            <NavLink href='#!' className='p-2' style={{width: '3rem'}}><Twitter className='fs-3' /></NavLink>
                            <NavLink href='#!' className='p-2' style={{width: '3rem'}}><Github className='fs-3' /></NavLink>
                        </div>
                    </div>
                </Form>
            </Container>
        );
    };
}

export default SignIn;