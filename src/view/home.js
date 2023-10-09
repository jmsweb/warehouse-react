import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Search from 'react-bootstrap-icons/dist/icons/search';
import Camera from 'react-bootstrap-icons/dist/icons/camera';

const Home = () => {
  return (
    <Container
        className='d-flex align-items-center justify-content-center'
        style={{
            backgroundImage: 'url(/warehouse-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '60vh',
            minWidth: '100vw'
    }}>
      <Row style={{width: '50rem'}}>
        <Col>
          <Form>
            <InputGroup>
              <InputGroup.Text className='bg-white'><Search /></InputGroup.Text>
              <FormControl type='search' placeholder='Product Name, Description, SKU...' />
              <InputGroup.Text className='bg-white'>
                <Camera onClick={() => {alert('check for camera to scan UPC')}}/>
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;