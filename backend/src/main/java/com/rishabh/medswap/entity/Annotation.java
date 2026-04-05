package com.rishabh.medswap.entity;

import com.rishabh.medswap.enums.AnnotationType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "annotations")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Annotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private User doctor;

    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    @ManyToOne
    @JoinColumn(name = "substitute_id", nullable = false)
    private Medicine substitute;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnnotationType annotationType;

    private String reason;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}