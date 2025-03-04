import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
  const token = localStorage.getItem('token');
  
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Patient Management</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          {!token && <Nav.Link as={Link} to="/register">Register</Nav.Link>}
          {!token && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
          {token && <Nav.Link as={Link} to="/schedule">Schedule</Nav.Link>}
          {token && <Nav.Link as={Link} to="/appointments">Appointments</Nav.Link>}
          {token && <Nav.Link as={Link} to="/medications">Medications</Nav.Link>}
          {token && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
          {token && (
            <Nav.Link onClick={() => {localStorage.removeItem('token'); window.location.reload();}}>
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;