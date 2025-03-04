import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navbar';
import PatientRegistration from './components/PatientRegistration';
import Login from './components/Login';
import AppointmentBooking from './components/AppointmentBooking';
import AppointmentScheduling from './components/AppointmentScheduling';
import MedicationManagement from './components/MedicationManagement';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/register" element={<PatientRegistration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/schedule" element={<AppointmentScheduling />} />
        <Route path="/appointments" element={<AppointmentBooking />} />
        <Route path="/medications" element={<MedicationManagement />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/" element={<h1 className="text-center mt-4">Welcome to Patient Management System</h1>} />
      </Routes>
    </Router>
  );
}

export default App;