package com.rishabh.medswap.repository;

import com.rishabh.medswap.entity.Medicine;
import com.rishabh.medswap.entity.Substitute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubstituteRepository extends JpaRepository<Substitute, Long> {
    List<Substitute> findByMedicine(Medicine medicine);
    boolean existsByMedicineAndSubstitute(Medicine medicine, Medicine substitute);
}