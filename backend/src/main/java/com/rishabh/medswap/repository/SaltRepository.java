package com.rishabh.medswap.repository;

import com.rishabh.medswap.entity.Salt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SaltRepository extends JpaRepository<Salt, Long> {
    Optional<Salt> findByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCase(String name);
}