import { useState, useEffect } from 'react';
import { Container, Card, Button, ListGroup, Modal, Form } from 'react-bootstrap';
import { authApi } from '../services/api';

function MedicationManagement() {
  const [medications, setMedications] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [newMedication, setNewMedication] = useState({
    patient: { id: 1 }, // Replace with actual patient ID from context
    doctor: { id: '' },
    name: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    active: true
  });
  const token = localStorage.getItem('token');
  const patientId = 1; // Replace with actual patient ID from context

  useEffect(() => {
    fetchMedications();
  }, [token]);

  const fetchMedications = async () => {
    try {
      const response = await authApi.getPatientMedications(patientId, token);
      setMedications(response.data);
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  };

  const handleAddMedication = async () => {
    try {
      await authApi.addMedication(newMedication, token);
      setShowAddModal(false);
      setNewMedication({ ...newMedication, name: '', dosage: '', frequency: '', startDate: '', endDate: '' });
      fetchMedications();
      alert('Medication added successfully!');
    } catch (error) {
      alert('Error adding medication: ' + (error.response?.data || error.message));
    }
  };

  const handleUpdateMedication = async () => {
    try {
      await authApi.updateMedication(selectedMedication.id, selectedMedication, token);
      setShowEditModal(false);
      fetchMedications();
      alert('Medication updated successfully!');
    } catch (error) {
      alert('Error updating medication: ' + (error.response?.data || error.message));
    }
  };

  const handleDeleteMedication = async (id) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      try {
        await authApi.deleteMedication(id, token);
        fetchMedications();
        alert('Medication deleted successfully!');
      } catch (error) {
        alert('Error deleting medication: ' + (error.response?.data || error.message));
      }
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Medication Management</Card.Title>
          <Button variant="primary" onClick={() => setShowAddModal(true)} className="mb-3">
            Add Medication
          </Button>
          
          <ListGroup>
            {medications.map(med => (
              <ListGroup.Item key={med.id}>
                <div>
                  <strong>{med.name}</strong> - {med.dosage}, {med.frequency}
                  <br />
                  Start: {new Date(med.startDate).toLocaleDateString()}
                  {med.endDate && ` - End: ${new Date(med.endDate).toLocaleDateString()}`}
                  <br />
                  Status: {med.active ? 'Active' : 'Inactive'}
                  <br />
                  Prescribed by: Dr. {med.doctor.firstName} {med.doctor.lastName}
                </div>
                <div className="float-end">
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => {
                      setSelectedMedication(med);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDeleteMedication(med.id)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Medication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Doctor ID</Form.Label>
              <Form.Control
                type="number"
                value={newMedication.doctor.id}
                onChange={(e) => setNewMedication({...newMedication, doctor: { id: e.target.value }})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Medication Name</Form.Label>
              <Form.Control
                type="text"
                value={newMedication.name}
                onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dosage</Form.Label>
              <Form.Control
                type="text"
                value={newMedication.dosage}
                onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Frequency</Form.Label>
              <Form.Control
                type="text"
                value={newMedication.frequency}
                onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={newMedication.startDate}
                onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={newMedication.endDate}
                onChange={(e) => setNewMedication({...newMedication, endDate: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddMedication}>
            Add Medication
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Medication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMedication && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Medication Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMedication.name}
                  onChange={(e) => setSelectedMedication({...selectedMedication, name: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Dosage</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMedication.dosage}
                  onChange={(e) => setSelectedMedication({...selectedMedication, dosage: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Frequency</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMedication.frequency}
                  onChange={(e) => setSelectedMedication({...selectedMedication, frequency: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedMedication.startDate}
                  onChange={(e) => setSelectedMedication({...selectedMedication, startDate: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedMedication.endDate || ''}
                  onChange={(e) => setSelectedMedication({...selectedMedication, endDate: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Active"
                  checked={selectedMedication.active}
                  onChange={(e) => setSelectedMedication({...selectedMedication, active: e.target.checked})}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateMedication}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MedicationManagement;