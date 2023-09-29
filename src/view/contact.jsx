import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
 
class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCompleted: false
        }
        //This has performance benefits as the events aren’t binding every time the method is called,
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        console.log('contact loaded');
        console.log('SITE BUILD: ' + process.env.SITE_BUILD);
        console.log('WAREHOUSE URL: ' + process.env.WAREHOUSE_API);
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    render() {
        return (
            <Container className='p-3' style={{ minHeight: '60vh'}}>
                <h1 className='text-center py-4'>Contact Us</h1>
                <Form onSubmit={this.onSubmit} className='d-flex flex-column w-50 mx-auto' style={{minWidth: '21rem'}}>
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
}

export default Contact;