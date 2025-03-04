package net.guvi.service;

import net.guvi.entity.Doctor;
import net.guvi.entity.Medication;
import net.guvi.entity.Patient;
import net.guvi.exception.ResourceNotFoundException;
import net.guvi.repository.DoctorRepository;
import net.guvi.repository.MedicationRepository;
import net.guvi.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicationService {
    @Autowired
    private MedicationRepository medicationRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Medication> getPatientMedications(Long patientId) {
        return medicationRepository.findByPatientId(patientId);
    }

    public Medication addMedication(Medication medication) {
        Patient patient = patientRepository.findById(medication.getPatient().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        Doctor doctor = doctorRepository.findById(medication.getDoctor().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        medication.setPatient(patient);
        medication.setDoctor(doctor);
        return medicationRepository.save(medication);
    }

    public Medication updateMedication(Long id, Medication medicationDetails) {
        Medication medication = medicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medication not found"));

        medication.setName(medicationDetails.getName());
        medication.setDosage(medicationDetails.getDosage());
        medication.setFrequency(medicationDetails.getFrequency());
        medication.setStartDate(medicationDetails.getStartDate());
        medication.setEndDate(medicationDetails.getEndDate());
        medication.setActive(medicationDetails.isActive());

        return medicationRepository.save(medication);
    }

    public void deleteMedication(Long id) {
        Medication medication = medicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medication not found"));
        medicationRepository.delete(medication);
    }
}