package com.rishabh.medswap.dto.request;

import com.rishabh.medswap.enums.Role;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank String name;
    @Email @NotBlank String email;
    @NotBlank @Size(min = 8) String password;
    @NotBlank String phone;
    Role role;
    String medicalRegistrationNumber;
    String specialisation;
}