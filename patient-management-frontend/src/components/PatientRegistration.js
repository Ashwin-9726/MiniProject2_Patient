import { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { authApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

function PatientRegistration() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    medicalHistory: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    if (!patient.firstName) tempErrors.firstName = 'First name is required';
    if (!patient.lastName) tempErrors.lastName = 'Last name is required';
    if (!patient.email) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(patient.email)) tempErrors.email = 'Email is invalid';
    if (!patient.password) tempErrors.password = 'Password is required';
    else if (patient.password.length < 6) tempErrors.password = 'Password must be at least 6 characters';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log('Sending registration request:', patient); // Debug payload
      const response = await authApi.register(patient);
      console.log('Registration response:', response.data); // Debug response
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      alert('Registration failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Patient Registration</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={patient.firstName}
                onChange={(e) => setPatient({ ...patient, firstName: e.target.value })}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={patient.lastName}
                onChange={(e) => setPatient({ ...patient, lastName: e.target.value })}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={patient.email}
                onChange={(e) => setPatient({ ...patient, email: e.target.value })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={patient.phoneNumber}
                onChange={(e) => setPatient({ ...patient, phoneNumber: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={patient.password}
                onChange={(e) => setPatient({ ...patient, password: e.target.value })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Medical History</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={patient.medicalHistory}
                onChange={(e) => setPatient({ ...patient, medicalHistory: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PatientRegistration;