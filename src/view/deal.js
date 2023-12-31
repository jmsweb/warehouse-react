import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

const Deal = () => {
  return (
    <Container className='p-3 d-flex flex-column' style={{ minHeight: '60vh'}}>
      <Row className='d-flex justify-content-center'>
        <Col sm className='my-2'>
          <div className='rounded border border-primary px-3 py-3'>
            <div>
              <h5 className='text-center p-2'>Just Arrived</h5>
              <p style={{minWidth: '13rem', height: '11rem'}}>These items are the latest additions to our collection, handpicked to
              bring you the newest and most exciting options available.</p>
              <Link
                  className="btn btn-primary mt-auto text-nowrap w-100"
                  role="button"
                  to='/catalog/explore-new-products'
              >Explore New Products</Link>
            </div>
          </div>
        </Col>
        <Col sm className='my-2'>
          <div className='rounded border border-primary px-3 py-3'>
            <div>
              <h5 className='text-center p-2'>Featured Products</h5>
              <p style={{minWidth: '13rem', height: '11rem'}}>Discover our carefully curated collection of featured products! These 
              standout items have been handpicked for their exceptional quality, unique design, and popular demand.</p>
              <Link
                  className="btn btn-primary mt-auto text-nowrap w-100"
                  role="button"
                  to='/catalog/explore-featured-products'
              >Explore Featured Products</Link>
            </div>
          </div>
        </Col>
        <Col sm className='my-2'>
          <div className='rounded border border-primary px-3 py-3'>
            <div>
              <h5 className='text-center p-2'>Specials</h5>
              <p style={{minWidth: '13rem', height: '11rem'}}>Our specials collection showcases a range of products
              that stand out for their exceptional pricing or limited-time promotions.</p>
              <Link
                  className="btn btn-primary mt-auto text-nowrap w-100"
                  role="button"
                  to='/catalog/explore-specials'
              >Explore Specials</Link>
            </div>
          </div>
        </Col>
        <Col sm className='my-2'>
          <div className='rounded border border-primary px-3 py-3'>
            <div>
              <h5 className='text-center p-2'>Closeouts</h5>
              <p style={{minWidth: '13rem', height: '11rem'}}>Our closeout collection features products that are being phased
              out or discontinued, creating an opportunity for you to score exceptional
              savings.</p>
              <Link
                  className="btn btn-primary mt-auto text-nowrap w-100"
                  role="button"
                  to='/catalog/explore-closeouts'
              >Explore Closeouts</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Deal;