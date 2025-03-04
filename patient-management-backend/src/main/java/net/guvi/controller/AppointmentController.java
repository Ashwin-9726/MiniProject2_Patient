package net.guvi.controller;

import jakarta.validation.Valid;
import net.guvi.entity.Appointment;
import net.guvi.service.DoctorScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private DoctorScheduleService doctorScheduleService;

    @GetMapping("/available/{doctorId}")
    public List<Appointment> getAvailableSlots(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return doctorScheduleService.getAvailableSlots(doctorId, date);
    }

    @PostMapping("/book")
    public Appointment bookAppointment(@Valid @RequestBody BookingRequest bookingRequest) {
        return doctorScheduleService.bookSlot(
                bookingRequest.getPatientId(),
                bookingRequest.getDoctorId(),
                bookingRequest.getAppointmentDateTime(),
                bookingRequest.getReason()
        );
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getPatientAppointments(@PathVariable Long patientId) {
        return doctorScheduleService.getPatientAppointments(patientId);
    }
}

//@Data
class BookingRequest {
    private Long patientId;
    private Long doctorId;

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public LocalDateTime getAppointmentDateTime() {
        return appointmentDateTime;
    }

    public void setAppointmentDateTime(LocalDateTime appointmentDateTime) {
        this.appointmentDateTime = appointmentDateTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    private LocalDateTime appointmentDateTime;
    private String reason;
}