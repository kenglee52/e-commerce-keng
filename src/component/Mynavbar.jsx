import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Nav, Container, Navbar } from 'react-bootstrap';
const Mynavbar = () => {
    return (
        <div style={{ fontFamily: '"Noto Sans Lao", sans-serif' }}>
            <Navbar expand="lg" style={{ backgroundColor: '#e83e8c' }}>
                <Container>
                    <Navbar.Brand className='fw-bold text-white'>SHOX eCommerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto fw-bold">
                            <Nav.Link as={Link} className='text-white' to="/dashboard">ຮ້ານຄ້າ</Nav.Link>
                            <Nav.Link as={Link} className='text-white' to="/history">ປະຫວັດການສັ່ງຊື້</Nav.Link>
                            <Nav.Link as={Link} className='text-white' to="/profile">ຂໍ້ມູນສ່ວນຕົວ ແລະ ກະເປົາເງິນ</Nav.Link>
                            <Nav.Link as={Link} className='text-white' to="/">ອອກຈາກລະບົບ</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Mynavbar;
