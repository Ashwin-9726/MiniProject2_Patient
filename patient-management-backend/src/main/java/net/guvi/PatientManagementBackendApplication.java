package net.guvi;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
		info = @Info(
				title = "Patient Medicine Appointment System  REST API Documentation",
				description = "Appointment Booking System",
				version = "v1.0",
				contact = @Contact(
						name = "Ashwin",
						email = "ashwin@gmail.com",
						url = "http://www.google.com"
				)
		)
)
public class PatientManagementBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PatientManagementBackendApplication.class, args);
	}

}
