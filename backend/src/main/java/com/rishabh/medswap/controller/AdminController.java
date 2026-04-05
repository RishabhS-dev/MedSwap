package com.rishabh.medswap.controller;

import com.rishabh.medswap.entity.Submission;
import com.rishabh.medswap.entity.User;
import com.rishabh.medswap.enums.DoctorStatus;
import com.rishabh.medswap.repository.UserRepository;
import com.rishabh.medswap.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final SubmissionService submissionService;
    private final UserRepository userRepository;

    @GetMapping("/submissions")
    public ResponseEntity<List<Submission>> getPending() {
        return ResponseEntity.ok(submissionService.getPendingSubmissions());
    }

    @PostMapping("/submissions/{id}/approve")
    public ResponseEntity<Submission> approve(@PathVariable Long id) {
        return ResponseEntity.ok(submissionService.approveSubmission(id));
    }

    @PostMapping("/submissions/{id}/reject")
    public ResponseEntity<Submission> reject(@PathVariable Long id, @RequestParam String reason) {
        return ResponseEntity.ok(submissionService.rejectSubmission(id, reason));
    }

    @PostMapping("/doctors/{id}/verify")
    public ResponseEntity<User> verifyDoctor(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setDoctorStatus(DoctorStatus.VERIFIED);
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PostMapping("/doctors/{id}/reject")
    public ResponseEntity<User> rejectDoctor(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setDoctorStatus(DoctorStatus.REJECTED);
        return ResponseEntity.ok(userRepository.save(user));
    }
}