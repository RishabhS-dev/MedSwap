package com.rishabh.medswap.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "salts")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Salt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    @ManyToMany(mappedBy = "salts")
    private List<Medicine> medicines;
}