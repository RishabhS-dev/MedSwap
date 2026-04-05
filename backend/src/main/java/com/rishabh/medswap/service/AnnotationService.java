package com.rishabh.medswap.service;

import com.rishabh.medswap.dto.request.AnnotationRequest;
import com.rishabh.medswap.entity.Annotation;
import com.rishabh.medswap.entity.Medicine;
import com.rishabh.medswap.entity.User;
import com.rishabh.medswap.enums.DoctorStatus;
import com.rishabh.medswap.repository.AnnotationRepository;
import com.rishabh.medswap.repository.MedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnnotationService {

    private final AnnotationRepository annotationRepository;
    private final MedicineRepository medicineRepository;

    public Annotation addAnnotation(AnnotationRequest request, User doctor) {
        if (doctor.getDoctorStatus() != DoctorStatus.VERIFIED)
            throw new RuntimeException("Doctor not verified yet");

        Medicine medicine = medicineRepository.findById(request.getMedicineId())
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        Medicine substitute = medicineRepository.findById(request.getSubstituteId())
                .orElseThrow(() -> new RuntimeException("Substitute not found"));

        annotationRepository.findByDoctorAndMedicineAndSubstitute(doctor, medicine, substitute)
                .ifPresent(a -> { throw new RuntimeException("Annotation already exists"); });

        Annotation annotation = Annotation.builder()
                .doctor(doctor)
                .medicine(medicine)
                .substitute(substitute)
                .annotationType(request.getAnnotationType())
                .reason(request.getReason())
                .build();

        return annotationRepository.save(annotation);
    }
}