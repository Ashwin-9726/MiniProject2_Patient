package net.guvi.controller;

import jakarta.validation.Valid;
import net.guvi.entity.Medication;
import net.guvi.service.MedicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medications")
public class MedicationController {
    @Autowired
    private MedicationService medicationService;

    @GetMapping("/patient/{patientId}")
    public List<Medication> getPatientMedications(@PathVariable Long patientId) {
        return medicationService.getPatientMedications(patientId);
    }

    @PostMapping
    public Medication addMedication(@Valid @RequestBody Medication medication) {
        return medicationService.addMedication(medication);
    }

    @PutMapping("/{id}")
    public Medication updateMedication(@PathVariable Long id, @Valid @RequestBody Medication medication) {
        return medicationService.updateMedication(id, medication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedication(@PathVariable Long id) {
        medicationService.deleteMedication(id);
        return ResponseEntity.ok().build();
    }
}