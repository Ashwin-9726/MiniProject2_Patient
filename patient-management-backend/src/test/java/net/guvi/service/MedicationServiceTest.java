package net.guvi.service;

import net.guvi.entity.Doctor;
import net.guvi.entity.Medication;
import net.guvi.entity.Patient;
import net.guvi.repository.DoctorRepository;
import net.guvi.repository.MedicationRepository;
import net.guvi.repository.PatientRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class MedicationServiceTest {

    @Autowired
    private MedicationService medicationService;

    @MockitoBean
    private MedicationRepository medicationRepository;

    @MockitoBean
    private PatientRepository patientRepository;

    @MockitoBean
    private DoctorRepository doctorRepository;

    @Test
    void testAddMedication() {
        Medication medication = new Medication();
        medication.setName("Aspirin");
        Patient patient = new Patient();
        patient.setId(1L);
        Doctor doctor = new Doctor();
        doctor.setId(1L);
        medication.setPatient(patient);
        medication.setDoctor(doctor);

        when(patientRepository.findById(1L)).thenReturn(Optional.of(patient));
        when(doctorRepository.findById(1L)).thenReturn(Optional.of(doctor));
        when(medicationRepository.save(any(Medication.class))).thenReturn(medication);

        Medication result = medicationService.addMedication(medication);

        assertNotNull(result);
        assertEquals("Aspirin", result.getName());
        verify(medicationRepository, times(1)).save(any(Medication.class));
    }

    @Test
    void testDeleteMedication() {
        Medication medication = new Medication();
        medication.setId(1L);
        when(medicationRepository.findById(1L)).thenReturn(Optional.of(medication));

        medicationService.deleteMedication(1L);

        verify(medicationRepository, times(1)).delete(medication);
    }
}