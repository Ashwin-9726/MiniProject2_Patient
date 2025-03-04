package net.guvi.service;

import net.guvi.entity.Appointment;
import net.guvi.entity.Doctor;
import net.guvi.entity.Patient;
import net.guvi.exception.ResourceNotFoundException;
import net.guvi.repository.AppointmentRepository;
import net.guvi.repository.DoctorRepository;
import net.guvi.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DoctorScheduleService {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    public List<Appointment> getAvailableSlots(Long doctorId, LocalDate date) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(23, 59);

        List<Appointment> bookedAppointments = appointmentRepository
                .findByDoctorIdAndStatusNot(doctorId, Appointment.AppointmentStatus.AVAILABLE);

        List<Appointment> availableSlots = new ArrayList<>();
        LocalDateTime currentSlot = date.atTime(9, 0);

        while (currentSlot.isBefore(date.atTime(17, 0))) {
            LocalDateTime finalCurrentSlot = currentSlot;
            boolean isBooked = bookedAppointments.stream()
                    .anyMatch(app -> app.getAppointmentDateTime().equals(finalCurrentSlot));

            if (!isBooked) {
                Appointment slot = new Appointment();
                slot.setDoctor(doctor);
                slot.setAppointmentDateTime(currentSlot);
                slot.setStatus(Appointment.AppointmentStatus.AVAILABLE);
                availableSlots.add(slot);
            }
            currentSlot = currentSlot.plusMinutes(30);
        }
        return availableSlots;
    }

    public Appointment bookSlot(Long patientId, Long doctorId, LocalDateTime slotTime, String reason) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDateTime(slotTime);
        appointment.setReason(reason);
        appointment.setStatus(Appointment.AppointmentStatus.SCHEDULED);

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getPatientAppointments(Long patientId) {
        return List.of();
    }
}
