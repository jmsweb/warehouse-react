import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
 
class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCompleted: false
        }
        //This has performance benefits as the events aren’t binding every time the method is called,
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        console.log('forgot password loaded');
        console.log(process.env.REACT_APP_WAREHOUSE_API);
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    render() {
        return (
            <Container className='p-3' style={{ minHeight: '60vh'}}>
                <h1 className='text-center py-4'>Forgot Password</h1>
                {this.state.error && <Alert variant='danger' key={1}>Please submit correct credentials.</Alert>}

                <Form onSubmit={this.onSubmit} className='d-flex flex-column w-50 mx-auto' style={{minWidth: '21rem'}}>
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
    };
}

export default ForgotPassword;