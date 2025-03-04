import { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { authApi } from '../services/api';

function UserProfile() {
  const [patient, setPatient] = useState(null);
  const [patientId, setPatientId] = useState('');
  const token = localStorage.getItem('token');

  const fetchPatient = async () => {
    try {
      const response = await authApi.getPatient(patientId, token);
      setPatient(response.data);
    } catch (error) {
      alert('Patient not found');
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>User Profile</Card.Title>
          <Form.Group className="mb-3">
            <Form.Label>Enter Patient ID</Form.Label>
            <Form.Control
              type="number"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
            <Button className="mt-2" onClick={fetchPatient}>Search</Button>
          </Form.Group>

          {patient && (
            <div>
              <p><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
              <p><strong>Email:</strong> {patient.email}</p>
              <p><strong>Phone:</strong> {patient.phoneNumber}</p>
              <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserProfile;