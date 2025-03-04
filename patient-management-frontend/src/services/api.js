import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  register: (patient) => api.post('/auth/register', patient),
  login: (credentials) => api.post('/auth/login', credentials),
  
  getAllPatients: (token) => api.get('/patients', { headers: { Authorization: `Bearer ${token}` } }),
  getPatient: (id, token) => api.get(`/patients/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
  updatePatient: (id, patient, token) => api.put(`/patients/${id}`, patient, { headers: { Authorization: `Bearer ${token}` } }),
  
  getDoctors: (token) => api.get('/doctors', { headers: { Authorization: `Bearer ${token}` } }),
  
  getAvailableSlots: (doctorId, date, token) => api.get(
    `/appointments/available/${doctorId}?date=${date}`,
    { headers: { Authorization: `Bearer ${token}` } }
  ),
  bookAppointment: (bookingData, token) => api.post(
    '/appointments/book',
    bookingData,
    { headers: { Authorization: `Bearer ${token}` } }
  ),
  getPatientAppointments: (patientId, token) => api.get(
    `/appointments/patient/${patientId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  ),
  
  getPatientMedications: (patientId, token) => api.get(
    `/medications/patient/${patientId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  ),
  addMedication: (medication, token) => api.post(
    '/medications',
    medication,
    { headers: { Authorization: `Bearer ${token}` } }
  ),
  updateMedication: (id, medication, token) => api.put(
    `/medications/${id}`,
    medication,
    { headers: { Authorization: `Bearer ${token}` } }
  ),
  deleteMedication: (id, token) => api.delete(
    `/medications/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  ),
};