import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from 'react-router-dom';
import Facebook from 'react-bootstrap-icons/dist/icons/facebook';
import Twitter from 'react-bootstrap-icons/dist/icons/twitter';
import Google from 'react-bootstrap-icons/dist/icons/google';
import Github from 'react-bootstrap-icons/dist/icons/github';
import UserContext from '../context/user-context';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [validated, setValidated] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
      console.log(user);
      if (user !== null) {
          navigate('/');
      }
  }, [navigate, user]);

  const onSubmit = (event) => {
    setError(null);
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    (async () => {
      await fetch(process.env.WAREHOUSE_API + '/api/v1/auth', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': 'Basic ' + btoa(username + ':' + password),
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(response => {
        if (!response.hasOwnProperty('success') || !response.success || !response.hasOwnProperty('jwt')) {
          throw new Error("Please use correct credentials");
        }
        console.log('redirect...');
        setUser({
          jwt: response.jwt,
          email: response.payload.email,
          id: response.payload.id,
          name: response.payload.name,
          admin: response.payload.admin
        });
      })
      .catch((error) => setError("Server error: " + error.message + "."));
    })();
  }

    return (
      <Container className='p-3' style={{ minHeight: '60vh'}}>
        {error && <Alert variant='danger' key={1}>{error}</Alert>}
        <Form noValidate validated={validated} onSubmit={onSubmit} className='d-flex flex-column w-50 mx-auto mt-4 mb-4' style={{minWidth: '21rem'}}>
          <Form.Group controlId='form_un' className='mb-4'>
            <Form.Control required type='email' placeholder='Email' value={username} onChange={(e) => setUsername(e.target.value) } />
            <Form.Control.Feedback type='invalid'>Email is a required field!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='form_pw' className='mb-4'>
            <Form.Control required type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value) } />
            <Form.Control.Feedback type='invalid'>Password is a required field!</Form.Control.Feedback>
          </Form.Group>
          <div className='d-flex justify-content-center mx-3 mb-4'>
            <Form.Group controlId='form_rm' className='p-2'>
              <Form.Check required={false} type='checkbox' label='Remember me' />
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
}

export default SignIn;