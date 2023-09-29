import React from 'react';
import Container from 'react-bootstrap/Container';
 
class CartReview extends React.Component {

    componentDidMount() {
        console.log('review cart items');
    }

    render() {
        return (
            <Container className='p-3' style={{ minHeight: '60vh'}}>
                <h1 className='text-center py-4'>Review Cart</h1>
            </Container>
        );
    };
}

export default CartReview;