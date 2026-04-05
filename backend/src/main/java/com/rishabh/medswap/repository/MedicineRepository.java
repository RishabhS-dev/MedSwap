package com.rishabh.medswap.repository;

import com.rishabh.medswap.entity.Medicine;
import com.rishabh.medswap.enums.SubmissionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    List<Medicine> findByStatus(SubmissionStatus status);

    @Query("SELECT m FROM Medicine m WHERE m.status = 'APPROVED' AND " +
            "(LOWER(m.brandName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "EXISTS (SELECT s FROM m.salts s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :query, '%'))))")
    List<Medicine> searchMedicines(@Param("query") String query);
}