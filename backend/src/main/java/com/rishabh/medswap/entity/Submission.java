package com.rishabh.medswap.entity;

import com.rishabh.medswap.enums.SubmissionStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User submittedBy;

    @Column(nullable = false)
    private String brandName;

    private String manufacturer;
    private String saltComposition;
    private String strength;
    private String dosageForm;
    private Double mrp;
    private String rejectionReason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubmissionStatus status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime reviewedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        status = SubmissionStatus.PENDING;
    }
}