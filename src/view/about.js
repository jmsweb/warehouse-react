import React from 'react';
import Container from 'react-bootstrap/Container';

const About = () => {
  return (
    <Container className='p-3' style={{ minHeight: '60vh'}}>
      <h1 className='text-center py-4'>About Warehouse React ({process.env.SITE_BUILD})</h1>
    </Container>
  );
};

export default About;