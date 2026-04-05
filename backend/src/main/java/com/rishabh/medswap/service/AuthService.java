package com.rishabh.medswap.service;

import com.rishabh.medswap.dto.request.LoginRequest;
import com.rishabh.medswap.dto.request.RegisterRequest;
import com.rishabh.medswap.dto.response.AuthResponse;
import com.rishabh.medswap.entity.User;
import com.rishabh.medswap.enums.DoctorStatus;
import com.rishabh.medswap.enums.Role;
import com.rishabh.medswap.repository.UserRepository;
import com.rishabh.medswap.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail()))
            throw new RuntimeException("Email already registered");

        if (userRepository.existsByPhone(request.getPhone()))
            throw new RuntimeException("Phone already registered");

        Role role = request.getRole() != null ? request.getRole() : Role.PATIENT;

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(role)
                .doctorStatus(role == Role.DOCTOR ? DoctorStatus.PENDING : null)
                .medicalRegistrationNumber(request.getMedicalRegistrationNumber())
                .specialisation(request.getSpecialisation())
                .enabled(true)
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}