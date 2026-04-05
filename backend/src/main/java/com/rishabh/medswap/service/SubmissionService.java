package com.rishabh.medswap.service;

import com.rishabh.medswap.dto.request.MedicineRequest;
import com.rishabh.medswap.entity.Submission;
import com.rishabh.medswap.entity.User;
import com.rishabh.medswap.enums.SubmissionStatus;
import com.rishabh.medswap.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final MedicineService medicineService;

    public Submission submit(MedicineRequest request, User user) {
        Submission submission = Submission.builder()
                .submittedBy(user)
                .brandName(request.getBrandName())
                .manufacturer(request.getManufacturer())
                .saltComposition(request.getSaltNames() != null
                        ? String.join(", ", request.getSaltNames()) : "")
                .strength(request.getStrength())
                .dosageForm(request.getDosageForm())
                .mrp(request.getMrp())
                .status(SubmissionStatus.PENDING)
                .build();

        return submissionRepository.save(submission);
    }

    public List<Submission> getPendingSubmissions() {
        return submissionRepository.findByStatus(SubmissionStatus.PENDING);
    }

    public Submission approveSubmission(Long id) {
        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        MedicineRequest req = new MedicineRequest();
        req.setBrandName(submission.getBrandName());
        req.setManufacturer(submission.getManufacturer());
        req.setStrength(submission.getStrength());
        req.setDosageForm(submission.getDosageForm());
        req.setMrp(submission.getMrp());
        req.setSaltNames(List.of(submission.getSaltComposition().split(",\\s*")));

        medicineService.addMedicine(req);

        submission.setStatus(SubmissionStatus.APPROVED);
        submission.setReviewedAt(LocalDateTime.now());
        return submissionRepository.save(submission);
    }

    public Submission rejectSubmission(Long id, String reason) {
        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
        submission.setStatus(SubmissionStatus.REJECTED);
        submission.setRejectionReason(reason);
        submission.setReviewedAt(LocalDateTime.now());
        return submissionRepository.save(submission);
    }
}