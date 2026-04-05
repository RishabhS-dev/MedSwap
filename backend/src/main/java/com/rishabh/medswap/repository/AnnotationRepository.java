package com.rishabh.medswap.repository;

import com.rishabh.medswap.entity.Annotation;
import com.rishabh.medswap.entity.Medicine;
import com.rishabh.medswap.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnnotationRepository extends JpaRepository<Annotation, Long> {
    List<Annotation> findByMedicineAndSubstitute(Medicine medicine, Medicine substitute);
    List<Annotation> findByDoctor(User doctor);
    Optional<Annotation> findByDoctorAndMedicineAndSubstitute(User doctor, Medicine medicine, Medicine substitute);
}