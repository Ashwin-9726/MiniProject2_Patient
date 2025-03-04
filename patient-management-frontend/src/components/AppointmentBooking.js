import { useState, useEffect } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { authApi } from '../services/api';

function AppointmentBooking() {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');
  const patientId = 1; // Replace with actual patient ID from context

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await authApi.getPatientAppointments(patientId, token);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    if (token) fetchAppointments();
  }, [token]);

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Your Appointments</Card.Title>
          <ListGroup>
            {appointments.map(appointment => (
              <ListGroup.Item key={appointment.id}>
                Date: {new Date(appointment.appointmentDateTime).toLocaleString()} 
                <br />
                Doctor: Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
                <br />
                Reason: {appointment.reason}
                <br />
                Status: {appointment.status}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AppointmentBooking;