import React from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router';

const ShowProducts = () => {

    const par = useParams();
    console.log(par);
    return (
        <Container className='p-3 d-flex flex-column' style={{ minHeight: '60vh'}}>
            hello show-productadasd!
        </Container>
    );
}
 
export default ShowProducts;