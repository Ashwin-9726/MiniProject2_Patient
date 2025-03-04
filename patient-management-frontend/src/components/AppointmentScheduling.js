import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, ListGroup, Row, Col } from 'react-bootstrap';
import { authApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

function AppointmentScheduling() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [reason, setReason] = useState('');
  const token = localStorage.getItem('token');
  const patientId = 1; // Replace with actual patient ID from context

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await authApi.getDoctors(token);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    if (token) fetchDoctors();
  }, [token]);

  const handleDoctorChange = async (e) => {
    const doctorId = e.target.value;
    setSelectedDoctor(doctorId);
    if (doctorId && selectedDate) {
      fetchAvailableSlots(doctorId, selectedDate);
    }
  };

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (selectedDoctor && date) {
      fetchAvailableSlots(selectedDoctor, date);
    }
  };

  const fetchAvailableSlots = async (doctorId, date) => {
    try {
      const response = await authApi.getAvailableSlots(doctorId, date, token);
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleBookSlot = async (slot) => {
    const bookingData = {
      patientId: patientId,
      doctorId: selectedDoctor,
      appointmentDateTime: slot.appointmentDateTime,
      reason: reason
    };
    
    try {
      await authApi.bookAppointment(bookingData, token);
      alert('Appointment booked successfully!');
      navigate('/appointments');
    } catch (error) {
      alert('Error booking appointment: ' + (error.response?.data || error.message));
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Schedule an Appointment</Card.Title>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Doctor</Form.Label>
                <Form.Select
                  value={selectedDoctor}
                  onChange={handleDoctorChange}
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </Form.Group>
            </Col>
          </Row>

          {availableSlots.length > 0 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Reason for Appointment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </Form.Group>

              <h5>Available Slots</h5>
              <ListGroup>
                {availableSlots.map(slot => (
                  <ListGroup.Item key={slot.id}>
                    {new Date(slot.appointmentDateTime).toLocaleTimeString()} 
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="float-end"
                      onClick={() => handleBookSlot(slot)}
                    >
                      Book
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AppointmentScheduling;