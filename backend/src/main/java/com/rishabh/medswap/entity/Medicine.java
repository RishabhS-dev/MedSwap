package com.rishabh.medswap.entity;

import com.rishabh.medswap.enums.SubmissionStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "medicines")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brandName;

    @Column(nullable = false)
    private String manufacturer;

    private String dosageForm;

    private String strength;

    private Double mrp;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubmissionStatus status;

    @ManyToMany
    @JoinTable(
            name = "medicine_salts",
            joinColumns = @JoinColumn(name = "medicine_id"),
            inverseJoinColumns = @JoinColumn(name = "salt_id")
    )
    private List<Salt> salts;

    @ManyToOne
    @JoinColumn(name = "submitted_by")
    private User submittedBy;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}