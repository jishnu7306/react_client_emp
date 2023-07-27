import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navbare() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" style={{minHeight:'100px'}}>
      <Container>
        <Navbar.Brand href="#home"><h2>Navel H<font color='orange'>O</font>lidays</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/UserRegister">Registration</Nav.Link>
            <Nav.Link href="#link">Offers</Nav.Link>
            <NavDropdown title="Packages" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Paris Trip</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Family Package
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Malasian Trip</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Student Groups
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbare;