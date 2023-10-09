import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const ForgotPassword = () => {

  const [error, setError] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(process.env.REACT_APP_WAREHOUSE_API);
  }

  return (
    <Container className='p-3' style={{ minHeight: '60vh'}}>
      <h1 className='text-center py-4'>Forgot Password</h1>
      {error && <Alert variant='danger' key={1}>Please submit correct credentials.</Alert>}
      <Form onSubmit={onSubmit} className='d-flex flex-column w-50 mx-auto' style={{minWidth: '21rem'}}>
        <Form.Group controlId='form_un' className='mb-4'>
          <Form.Control type='email' placeholder='Email' />
        </Form.Group>
        <div className='mb-4'>
          <Form.Group>
            <Button type='submit' variant='primary' className='w-100'>EMAIL VERIFICATION CODE</Button>
          </Form.Group>
        </div>
      </Form>
    </Container>
  );
}

export default ForgotPassword;