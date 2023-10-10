import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Camera from 'react-bootstrap-icons/dist/icons/camera';
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode';

const AddProduct = () => {
  const [camera, setCamera] = useState(false);
  const [cameraId, setCameraId] = useState(null);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [slug, setSlug] = useState('');
  const [listPrice, setListPrice] = useState('');
  const [onlinePrice, setOnlinePrice] = useState('');
  const [weight, setWeight] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [depth, setDepth] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [validated, setValidated] = useState(false);

  const onClick = () => {
    if (cameraId) {
      qrCode.stop();
      setCameraId(null);
      setQrCode(null);
    } else {
      Html5Qrcode
        .getCameras()
        .then(devices => {
          if (devices && devices.length) {
            setCameraId(devices[0].id);
            setQrCode(new Html5Qrcode('html5qr-code-full-region'));
            console.log('found device', devices[0].id);
          }
        });
    }
  }

  useEffect(() => {
    if (cameraId !== null) {
      qrCode.start(cameraId, {fps: 30, qrbox: {width: 200, height: 125}}, (_sku) => {
        setSku(_sku);
        qrCode.stop();
        setCameraId(null);
        setQrCode(null);
      });
    }
  }, [cameraId]);

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    async function postData() {
      console.log(event);
      console.log(name);
      await fetch(process.env.WAREHOUSE_API + '/api/v1/product/add', {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            slug: slug,
            sku: sku,
            listPrice: listPrice,
            onlinePrice: onlinePrice,
            weight: weight,
            dimension: {
              width: width,
              height: height,
              depth: depth
            }
          })
      })
      .then(response => response.json())
      .then(response => {
          console.log(response);
      })
      .catch((error) => {
          console.log(error);
      });
    }

    postData();
  }

  return (
    <Container className='p-3 d-flex flex-column' style={{ minHeight: '60vh'}}>
      <Form noValidate validated={validated} onSubmit={onSubmit} name='product'>
        <div id='html5qr-code-full-region' className='mx-auto w-25'></div>
        <Row className='d-flex justify-content-center'>
          <Form.Group as={Col} controlId='form_name' className='mb-4'>
            <Form.Label>Name</Form.Label>
            <Form.Control required placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            <Form.Control.Feedback type='valid'>Name looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Name is a required field!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId='form_slug' className='mb-4'>
            <Form.Label>Slug</Form.Label>
            <Form.Control required placeholder='Slug' value={slug} onChange={(e) => setSlug(e.target.value)} />
            <Form.Control.Feedback type='valid'>Slug looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Slug is a required field!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId='form_sku' className='mb-4'>
            <Form.Label>SKU</Form.Label>
            <Camera className='m-1 align-top' onClick={onClick} />
            <Form.Control required placeholder='Product SKU' value={sku} onChange={(e) => setSku(e.target.value)} />
            <Form.Control.Feedback type='valid'>SKU looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>SKU is a required field!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Form.Group as={Col} controlId='form_list_price' className='mb-4'>
            <Form.Label>List</Form.Label>
            <Form.Control required type='number' placeholder='List Price' value={listPrice} onChange={(e) => setListPrice(e.target.value)} />
            <Form.Control.Feedback type='valid'>List price looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>List price is a required field!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId='form_online_price' className='mb-4'>
            <Form.Label>Online</Form.Label>
            <Form.Control required type='number' placeholder='Online Price' value={onlinePrice} onChange={(e) => setOnlinePrice(e.target.value)} />
            <Form.Control.Feedback type='valid'>Online price looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Online price is a required field!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId='form_weight' className='mb-4'>
              <Form.Label>Weight</Form.Label>
              <Form.Control required type='number' placeholder='Weight' value={weight} onChange={(e) => setWeight(e.target.value)} />
              <Form.Control.Feedback required type='valid'>Weight looks good!</Form.Control.Feedback>
              <Form.Control.Feedback required type='invalid'>Weight is a required field!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Form.Group as={Col} controlId='form_dimension_width' className='mb-4'>
            <Form.Label>Width</Form.Label>
            <Form.Control required type='number' placeholder='Width' value={width} onChange={(e) => setWidth(e.target.value)} />
            <Form.Control.Feedback type='valid'>Weight looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Weight is a required field!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId='form_dimension_height' className='mb-4'>
            <Form.Label>Height</Form.Label>
            <Form.Control required type='number' placeholder='Height' value={height} onChange={(e) => setHeight(e.target.value)} />
            <Form.Control.Feedback type='valid'>Height looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Height is a required field!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId='form_dimension_depth' className='mb-4'>
            <Form.Label>Depth</Form.Label>
            <Form.Control required type='number' placeholder='Depth' value={depth} onChange={(e) => setDepth(e.target.value)} />
            <Form.Control.Feedback type='valid'>Depth looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Depth is a required field!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className='mb-4'>
          <Button type='submit' className='w-100'>ADD PRODUCT</Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
 
export default AddProduct;