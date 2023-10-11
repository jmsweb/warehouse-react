import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Missing from 'react-bootstrap-icons/dist/icons/x';
import Complete from 'react-bootstrap-icons/dist/icons/check';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [validated, setValidated] = useState(false);
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (customer) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword1('');
      setPassword2('');
      setIsAdmin(false);
      console.log('reset form');
    }
  }, [customer]);

  const onSubmit = (event) => {
    setCustomer(null);
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.checkValidity() === false) {
      setValidated(true);
      return;
    }

    if ((!validatePassword(password1) || !validatePassword(password2) || password1 != password2)) {
      setValidated(true);
      return;
    }

    (async () => {
      await fetch(process.env.WAREHOUSE_API + '/api/v1/auth/customer', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': 'Basic ' + btoa(email + ':' + password1),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          isAdmin: isAdmin
        })
      })
      .then(response => {
        if (response.status == 401) {
          navigate('/sign-in');
        }
        return response.json();
      })
      .then(response => setCustomer(response))
      .catch(error => console.log(error));
    })();
  }

  const validatePassword = (password) => {
    const data = password.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const min = /^[\s\S]{8,}$/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /\d/;
    const special = /\$/;

    return min.test(data) && upper.test(data) && lower.test(data) && number.test(data) && special.test(data);
  }

  return (
    <Container className='p-3 d-flex flex-column' style={{ minHeight: '60vh'}}>
      {customer && <Alert variant={customer.success == false ? 'danger' : 'success'}>{customer.message}</Alert>}
      <Form noValidate validated={validated} onSubmit={onSubmit} name='product'>
        <Row>
          <Form.Group as={Col} controlId='form_first_name' className='mb-4'>
            <Form.Label>First Name</Form.Label>
            <Form.Control required placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Form.Control.Feedback type='valid'>First name looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>First name is a required field!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId='form_last_name' className='mb-4'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control required placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Form.Control.Feedback type='valid'>Last name looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Last name is a required field!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId='form_email' className='mb-4'>
            <Form.Label>Email</Form.Label>
            <Form.Control required type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Form.Control.Feedback type='valid'>Email looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Email is a required field!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId='form_is_admin' className='mb-4'>
            <Form.Label>Admin User</Form.Label>
            <Form.Check required={false} type='checkbox' label='Is admin?' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId='form_password1' className='mb-4'>
            <Form.Label>Password</Form.Label>
            <Form.Control required type='password' placeholder='Password' value={password1} onChange={(e) => setPassword1(e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} controlId='form_password2' className='mb-4'>
            <Form.Label>Enter Password Again</Form.Label>
            <Form.Control required type='password' placeholder='Password' value={password2} onChange={(e) => setPassword2(e.target.value)} />
          </Form.Group>
        </Row>
        {
          (!validatePassword(password1) || !validatePassword(password2) || password1 != password2) && 
          <Alert>
            <p>
              {/[A-Z]/.test(password1) ? <Complete style={{color: 'green'}} /> : <Missing style={{color: 'red'}} />} - Password must contain uppercase character.<br/>
              {/[a-z]/.test(password1) ? <Complete style={{color: 'green'}} /> : <Missing style={{color: 'red'}} />} - Password must contain lowercase character.<br/>
              {/\d/.test(password1) ? <Complete style={{color: 'green'}} /> : <Missing style={{color: 'red'}} />} - Password must contain digit.<br/>
              {/\W/.test(password1) ? <Complete style={{color: 'green'}} /> : <Missing style={{color: 'red'}} />} - Password must contain special symbol.<br/>
              {/^[\s\S]{8,}$/.test(password1) ? <Complete style={{color: 'green'}} /> : <Missing style={{color: 'red'}} />} - Password must be 8 or greater in length.<br/>
              {password1 == password2 ? <Complete style={{color: 'green'}} /> : <Missing style={{color: 'red'}} />} - Both passwords must match.
            </p>
          </Alert>
        }
        <Form.Group className='mb-4'>
          <Button type='submit' className='w-100'>ADD CUSTOMER</Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
 
export default AddCustomer;