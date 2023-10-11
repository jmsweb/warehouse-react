import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
 
const Contact = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log('SITE BUILD: ' + process.env.SITE_BUILD);
    console.log('WAREHOUSE URL: ' + process.env.WAREHOUSE_API);
  }

  return (
    <Container className='p-3' style={{ minHeight: '60vh'}}>
      <h1 className='text-center py-4'>Send us a message!</h1>
      <Form onSubmit={onSubmit} className='d-flex flex-column w-50 mx-auto' style={{minWidth: '21rem'}}>
        <Form.Group controlId='form_email' className='mb-4'>
          <Form.Control type='email' placeholder='Email' />
        </Form.Group>
        <Form.Group controlId='form_subject' className='mb-4'>
          <Form.Control placeholder='Subject' />
        </Form.Group>
        <Form.Group controlId='form_comment' className='mb-4'>
          <Form.Control as='textarea' placeholder='Comments' rows={5} />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Button type='submit' variant='primary' className='w-100'>SEND US MESSAGE!</Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Contact;