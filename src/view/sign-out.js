import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import UserContext from '../context/user-context';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      fetch(process.env.WAREHOUSE_API + '/api/v1/auth/reset', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(() => setUser(null))
      .catch(() => setUser(null));
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  return (
    <Container className='p-3' style={{ minHeight: '60vh'}}>
      <h1 className='text-center py-4'>Logging your account out...</h1>
    </Container>
  );
}

export default SignOut;