import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { Camera } from 'react-bootstrap-icons';
import { Html5Qrcode } from 'html5-qrcode';

class AddProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            useCamera: false,
            result: 'No result',
            cameraId: '',
            form: {
                name: '',
                sku: '',
                slug: '',
                listPrice: 0.0,
                onlinePrice: 0.0,
                weight: 0.0,
                dimension: { 
                    width: 0,
                    height: 0,
                    depth: 0
                }
            }
        }
        this.html5Qrcode = null;
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        Html5Qrcode
            .getCameras()
            .then(devices => {
                if (devices && devices.length) {
                    console.log('found device', devices[0].id);
                    this.setState(prevState => ({
                        ...prevState,
                        cameraId: devices[0].id
                    }));
                }
            })
            .catch(err => { console.log(err)});
    }

    onSubmit = (event) => {
        event.preventDefault();
        (async function(event, form) {
            console.log(event);
            console.log(form);
            await fetch(process.env.WAREHOUSE_API + '/api/v1/product/add', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        })(event, this.state.form);
    }

    render() {
        return (
            <Container className='p-3 d-flex flex-column' style={{ minHeight: '60vh'}}>
                <Form name='product'>
                    <div id='html5qr-code-full-region' className='w-50 mx-auto'></div>
                    <Row className='d-flex justify-content-center'>
                        <Form.Group as={Col} controlId='form_name' className='mb-4'>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type='text'
                                placeholder='Product Name' 
                                value={this.state.form.name}
                                onChange={
                                    (event) => this.setState(prevState => ({
                                        form: { 
                                            ...prevState.form,
                                            name: event.target.value
                                        }
                                    }))
                                }
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId='form_slug' className='mb-4'>
                            <Form.Label>Slug</Form.Label>
                            <Form.Control type='text'
                                placeholder='Slug'
                                value={this.state.form.slug}
                                onChange={
                                    (event) => this.setState(prevState => ({
                                        form: {
                                            ...prevState.form,
                                            slug: event.target.value
                                        }
                                    }))
                                }
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId='form_sku' className='mb-4'>
                            <Form.Label>Product SKU</Form.Label>
                            <Camera className='m-1 align-top' onClick={ () => {
                                this.setState(prevState => ({
                                    ...prevState,
                                    useCamera: !prevState.useCamera
                                }), () => {
                                    if (this.state.useCamera) {
                                        this.html5Qrcode = new Html5Qrcode('html5qr-code-full-region');
                                        this.html5Qrcode.start(
                                            this.state.cameraId,
                                            {fps: 30, qrbox: {width: 200, height: 75}, facingMode: 'environment'},
                                            (text, result) => {
                                                console.log(text, result);
                                                this.setState(prevState => ({
                                                    form: {
                                                        ...prevState.form,
                                                        sku: text,
                                                    }
                                                }), () => this.html5Qrcode.stop());
                                            }
                                        ).catch(error => {
                                            console.log('smething went wrong');
                                            console.log(error);
                                        });
                                    } else {
                                        this.html5Qrcode.stop();
                                    }
                                });
                                
                            }} />
                            <Form.Control type='text' 
                                placeholder='Product SKU'
                                value={this.state.form.sku}
                                onChange={
                                    (event) => this.setState(prevState => ({
                                        form: {
                                            ...prevState.form,
                                            sku: event.target.value
                                        }
                                    }))
                                }
                            />
                        </Form.Group>
                    </Row>
                    <Row className='d-flex justify-content-center'>
                        <Form.Group as={Col} controlId='form_list_price' className='mb-4'>
                            <Form.Label>List</Form.Label>
                            <Form.Control type='number'
                                placeholder='List Price'
                                value={this.state.form.listPrice}
                                onChange={
                                    (event) => this.setState(prevState => ({
                                        form: {
                                            ...prevState.form,
                                            listPrice: event.target.value
                                        }
                                    }))
                                }
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId='form_online_price' className='mb-4'>
                            <Form.Label>Online</Form.Label>
                            <Form.Control type='number'
                                placeholder='Online Price'
                                value={this.state.form.onlinePrice}
                                onChange={
                                    (event) => this.setState(prevState => ({
                                        form: {
                                            ...prevState.form,
                                            onlinePrice: event.target.value
                                        }
                                    }))
                                }
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId='form_weight' className='mb-4'>
                            <Form.Label>Weight</Form.Label>
                            <Form.Control type='number'
                                placeholder='Weight'
                                value={this.state.form.weight}
                                onChange={
                                    (event) => this.setState(prevState => ({
                                        form: {
                                            ...prevState.form,
                                            weight: event.target.value
                                        }
                                    }))
                                }
                            />
                        </Form.Group>
                    </Row>
                    <Row className='d-flex justify-content-center'>
                        <Form.Group as={Col} controlId='form_dimension_width' className='mb-4'>
                            <Form.Label>Width</Form.Label>
                            <Form.Control type='number'
                                placeholder='Width'
                                value={this.state.form.dimension.width}
                                onChange={
                                    (event) => this.setState(prevState => ({
                                        form: {
                                            ...prevState.form,
                                            dimension: {
                                                ...prevState.form.dimension,
                                                width: event.target.value
                                            }
                                        }
                                    }))
                                }
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId='form_dimension_height' className='mb-4'>
                            <Form.Label>Height</Form.Label>
                            <Form.Control type='number'
                                placeholder='Height'
                                value={this.state.form.dimension.height}
                                onChange={
                                    (event) => this.setState(prevState => ({
                                        form: {
                                            ...prevState.form,
                                            dimension: {
                                                ...prevState.form.dimension,
                                                height: event.target.value
                                            }
                                        }
                                    }))
                                }
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId='form_dimension_depth' className='mb-4'>
                            <Form.Label>Depth</Form.Label>
                            <Form.Control type='number'
                                placeholder='Depth'
                                value={this.state.form.dimension.depth}
                                onChange={
                                    (event) => this.setState(prevState => ({
                                        form: {
                                            ...prevState.form,
                                            dimension: {
                                                ...prevState.form.dimension,
                                                depth: event.target.value
                                            }
                                        }
                                    }))
                                }
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group className='mb-4'>
                        <Button type='button' onClick={this.onSubmit} variant='primary' className='w-100'>ADD PRODUCT</Button>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}
 
export default AddProduct;