import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { Camera } from 'react-bootstrap-icons';

class AddProduct extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('add products loaded');
    }

    onClick = () => {
        console.log('this was clicked');
    }

    render() {
        return (
            <Container className='p-3 d-flex flex-column' style={{ minHeight: '60vh'}}>
                <Form>
                    <InputGroup>
                        <InputGroup.Text className='bg-white'>
                            <Search />
                        </InputGroup.Text>
                        <FormControl type='search' 
                            placeholder='Product Name, Description, SKU...'
                            onClick={() => {}}
                        />
                        <InputGroup.Text className='bg-white'>
                            <Camera onClick={() => {alert('check for camera to scan UPC')}}/>
                        </InputGroup.Text>
                    </InputGroup>
                </Form>
            </Container>
        );
    }
}

 
export default AddProduct;