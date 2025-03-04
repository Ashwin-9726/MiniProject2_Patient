http://localhost:8080/swagger-ui/index.html#/ (swagger url to access)

Setup and Configuration
Prerequisites
Java 21: For backend development.
Maven: Dependency management for backend.
MySQL: Database server (version 8+ recommended).
Node.js and npm: For frontend development (version 18+ recommended).

API Endpoints
Base URL
Backend Base URL: http://localhost:8080/api
Authentication APIs
1. Register a Patient
URL: POST /auth/register
Description: Registers a new patient in the system.
Request Body:







{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phoneNumber": "string",
  "password": "string",
  "medicalHistory": "string"
}
Response:
Success (200 OK):
json






{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890",
  "password": "$2a$10$hashedPassword",
  "medicalHistory": "No allergies"
}
Error (400 Bad Request):







"Email already in use"
Validation Rules:
firstName: Required, non-empty.
lastName: Required, non-empty.
email: Required, valid email format, unique.
password: Required, non-empty.
phoneNumber, medicalHistory: Optional.
2. Login
URL: POST /auth/login
Description: Authenticates a patient and returns a token (placeholder in this version).
Request Body:
json






{
  "email": "string",
  "password": "string"
}
Response:
Success (200 OK):







"jwt-token-placeholder"
Error (401 Unauthorized):
json






"Bad credentials"
Validation Rules:
email: Required, must match a registered patient.
password: Required, must match the stored hashed password.
Patient APIs (Authenticated)
3. Get All Patients
URL: GET /patients
Description: Retrieves a list of all patients (admin access typically).
Headers: Authorization: Bearer <token>
Response:







[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "medicalHistory": "No allergies"
  }
]
4. Get Patient by ID
URL: GET /patients/{id}
Description: Retrieves details of a specific patient.
Headers: Authorization: Bearer <token>
Path Parameter: id (Long)
Response:
Success (200 OK):
json






{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890",
  "medicalHistory": "No allergies"
}
Error (404 Not Found):







"Patient not found"
5. Update Patient
URL: PUT /patients/{id}
Description: Updates patient details.
Headers: Authorization: Bearer <token>
Path Parameter: id (Long)
Request Body:







{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phoneNumber": "string",
  "medicalHistory": "string"
}
Response: Same as GET by ID.
Doctor APIs (Authenticated)
6. Get All Doctors
URL: GET /doctors
Description: Retrieves a list of all doctors.
Headers: Authorization: Bearer <token>
Response:
json






[
  {
    "id": 1,
    "firstName": "Jane",
    "lastName": "Smith",
    "specialty": "Cardiology",
    "email": "jane.smith@example.com",
    "phoneNumber": "0987654321"
  }
]
7. Get Doctor by ID
URL: GET /doctors/{id}
Description: Retrieves details of a specific doctor.
Headers: Authorization: Bearer <token>
Path Parameter: id (Long)
Response:
Success (200 OK):







{
  "id": 1,
  "firstName": "Jane",
  "lastName": "Smith",
  "specialty": "Cardiology",
  "email": "jane.smith@example.com",
  "phoneNumber": "0987654321"
}
Error (404 Not Found):






Copy
"Doctor not found"
8. Create Doctor
URL: POST /doctors
Description: Adds a new doctor.
Headers: Authorization: Bearer <token>
Request Body:






Copy
{
  "firstName": "string",
  "lastName": "string",
  "specialty": "string",
  "email": "string",
  "phoneNumber": "string"
}
Response: Same as GET by ID.
Validation Rules:
firstName, lastName, specialty: Required.
email: Required, unique.
9. Update Doctor
URL: PUT /doctors/{id}
Description: Updates doctor details.
Headers: Authorization: Bearer <token>
Path Parameter: id (Long)
Request Body: Same as POST.
Response: Same as GET by ID.
Appointment APIs (Authenticated)
10. Get Available Slots
URL: GET /appointments/available/{doctorId}?date={date}
Description: Retrieves available appointment slots for a doctor on a specific date.
Headers: Authorization: Bearer <token>
Path Parameter: doctorId (Long)
Query Parameter: date (ISO date, e.g., 2025-03-10)
Response:






Copy
[
  {
    "id": null,
    "doctor": {"id": 1, "firstName": "Jane", "lastName": "Smith", ...},
    "appointmentDateTime": "2025-03-10T09:00:00",
    "status": "AVAILABLE"
  }
]
11. Book Appointment
URL: POST /appointments/book
Description: Books an appointment for a patient with a doctor.
Headers: Authorization: Bearer <token>
Request Body:
json






{
  "patientId": "long",
  "doctorId": "long",
  "appointmentDateTime": "yyyy-MM-dd'T'HH:mm:ss",
  "reason": "string"
}
Response:
json






{
  "id": 1,
  "patient": {"id": 1, ...},
  "doctor": {"id": 1, ...},
  "appointmentDateTime": "2025-03-10T09:00:00",
  "reason": "Checkup",
  "status": "SCHEDULED"
}
12. Get Patient Appointments
URL: GET /appointments/patient/{patientId}
Description: Retrieves all appointments for a patient.
Headers: Authorization: Bearer <token>
Path Parameter: patientId (Long)
Response:






Copy
[
  {
    "id": 1,
    "patient": {"id": 1, ...},
    "doctor": {"id": 1, ...},
    "appointmentDateTime": "2025-03-10T09:00:00",
    "reason": "Checkup",
    "status": "SCHEDULED"
  }
]
Medication APIs (Authenticated)
13. Get Patient Medications
URL: GET /medications/patient/{patientId}
Description: Retrieves all medications prescribed to a patient.
Headers: Authorization: Bearer <token>
Path Parameter: patientId (Long)
Response:
json






[
  {
    "id": 1,
    "patient": {"id": 1, ...},
    "doctor": {"id": 1, ...},
    "name": "Aspirin",
    "dosage": "100mg",
    "frequency": "daily",
    "startDate": "2025-03-01",
    "endDate": "2025-03-31",
    "active": true
  }
]
14. Add Medication
URL: POST /medications
Description: Adds a new medication for a patient.
Headers: Authorization: Bearer <token>
Request Body:
json






{
  "patient": {"id": "long"},
  "doctor": {"id": "long"},
  "name": "string",
  "dosage": "string",
  "frequency": "string",
  "startDate": "yyyy-MM-dd",
  "endDate": "yyyy-MM-dd",
  "active": "boolean"
}
Response: Same as GET by patient ID.
Validation Rules:
name, dosage, frequency, startDate: Required.
15. Update Medication
URL: PUT /medications/{id}
Description: Updates an existing medication.
Headers: Authorization: Bearer <token>
Path Parameter: id (Long)
Request Body: Same as POST.
Response: Same as GET by patient ID.
16. Delete Medication
URL: DELETE /medications/{id}
Description: Deletes a medication.
Headers: Authorization: Bearer <token>
Path Parameter: id (Long)
Response:
Success (200 OK): Empty response body.
Error (404 Not Found):
json





"Medication not found"
Data Validation Rules
Strings: Non-empty where @NotBlank is specified.
Email: Must be a valid email format (@Email) and unique where specified.
Dates: ISO format (yyyy-MM-dd for dates, yyyy-MM-dd'T'HH:mm:ss for date-time).
IDs: Positive Long values.
Required Fields: Indicated by @NotBlank or @NotNull in entity classes.
Enums: AppointmentStatus must be one of SCHEDULED, COMPLETED, CANCELLED, AVAILABLE.
