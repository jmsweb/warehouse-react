import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
 
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCompleted: false
        }
        //This has performance benefits as the events aren’t binding every time the method is called,
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        console.log('register loaded');
        console.log(process.env.WAREHOUSE_API);
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    render() {
        return (
            <Container className='p-3' style={{ minHeight: '60vh'}}>
                <h1 className='text-center py-4'>New Registration</h1>
                <Form onSubmit={this.onSubmit} className='d-flex flex-column w-50 mx-auto' style={{minWidth: '21rem'}}>
                    <Form.Group controlId='form_un' className='mb-4'>
                        <Form.Control type='email' placeholder='Email' />
                    </Form.Group>
                    <Form.Group className='mb-4'>
                        <Button type='submit' variant='primary' className='w-100'>SEND REGISTRATION LINK</Button>
                    </Form.Group>
                </Form>
            </Container>
        );
    };
}

export default Register;