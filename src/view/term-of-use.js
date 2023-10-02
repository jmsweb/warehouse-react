import React from 'react';
import Container from 'react-bootstrap/Container';
 
class TermOfUse extends React.Component {
    render() {
        return (
            <Container className='p-3' style={{ minHeight: '60vh'}}>
                <h1 className='text-center py-4'>Term of Use</h1>
            </Container>
        );
    }
};
 
export default TermOfUse;