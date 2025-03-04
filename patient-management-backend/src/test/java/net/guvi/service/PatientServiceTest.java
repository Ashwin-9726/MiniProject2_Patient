package net.guvi.service;

import net.guvi.entity.Patient;
import net.guvi.exception.ResourceNotFoundException;
import net.guvi.repository.PatientRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class PatientServiceTest {

    @Autowired
    private PatientService patientService;

    @MockitoBean
    private PatientRepository patientRepository;

    @Test
    void testGetAllPatients() {
        List<Patient> patients = Arrays.asList(new Patient(), new Patient());
        when(patientRepository.findAll()).thenReturn(patients);

        List<Patient> result = patientService.getAllPatients();

        assertEquals(2, result.size());
        verify(patientRepository, times(1)).findAll();
    }

    @Test
    void testCreatePatient() {
        Patient patient = new Patient();
        patient.setEmail("test@example.com");
        when(patientRepository.save(any(Patient.class))).thenReturn(patient);

        Patient result = patientService.createPatient(patient);

        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
        verify(patientRepository, times(1)).save(patient);
    }

    @Test
    void testGetPatientByIdNotFound() {
        when(patientRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> patientService.getPatientById(1L));
    }
}