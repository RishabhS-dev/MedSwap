package com.rishabh.medswap.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "substitutes",
        uniqueConstraints = @UniqueConstraint(columnNames = {"medicine_id", "substitute_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Substitute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    @ManyToOne
    @JoinColumn(name = "substitute_id", nullable = false)
    private Medicine substitute;
}