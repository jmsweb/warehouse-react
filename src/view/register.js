import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
 
const Register = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(process.env.WAREHOUSE_API);
  }

  return (
    <Container className='p-3' style={{ minHeight: '60vh'}}>
      <h1 className='text-center py-4'>New Registration</h1>
      <Form onSubmit={onSubmit} className='d-flex flex-column w-50 mx-auto' style={{minWidth: '21rem'}}>
        <Form.Group controlId='form_un' className='mb-4'>
          <Form.Control type='email' placeholder='Email' />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Button type='submit' variant='primary' className='w-100'>SEND REGISTRATION LINK</Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Register;