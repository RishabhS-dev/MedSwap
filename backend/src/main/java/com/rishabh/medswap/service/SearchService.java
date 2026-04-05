package com.rishabh.medswap.service;

import com.rishabh.medswap.dto.response.MedicineResponse;
import com.rishabh.medswap.dto.response.SubstituteResponse;
import com.rishabh.medswap.entity.Medicine;
import com.rishabh.medswap.entity.Salt;
import com.rishabh.medswap.entity.Substitute;
import com.rishabh.medswap.repository.AnnotationRepository;
import com.rishabh.medswap.repository.MedicineRepository;
import com.rishabh.medswap.repository.SubstituteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final MedicineRepository medicineRepository;
    private final SubstituteRepository substituteRepository;
    private final AnnotationRepository annotationRepository;
    private final MedicineService medicineService;

    public List<MedicineResponse> search(String query) {
        if (query == null || query.trim().length() < 2)
            throw new RuntimeException("Query must be at least 2 characters");

        return medicineRepository.searchMedicines(query.trim())
                .stream().map(medicineService::toResponse).toList();
    }

    public List<SubstituteResponse> getSubstitutes(Long medicineId) {
        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        return substituteRepository.findByMedicine(medicine)
                .stream()
                .map(sub -> buildSubstituteResponse(medicine, sub))
                .toList();
    }

    private SubstituteResponse buildSubstituteResponse(Medicine original, Substitute sub) {
        Medicine s = sub.getSubstitute();
        var annotations = annotationRepository.findByMedicineAndSubstitute(original, s);

        SubstituteResponse response = SubstituteResponse.builder()
                .id(s.getId())
                .brandName(s.getBrandName())
                .manufacturer(s.getManufacturer())
                .dosageForm(s.getDosageForm())
                .strength(s.getStrength())
                .mrp(s.getMrp())
                .salts(s.getSalts() != null
                        ? s.getSalts().stream().map(Salt::getName).toList()
                        : List.of())
                .build();

        if (!annotations.isEmpty()) {
            var annotation = annotations.get(0);
            response.setDoctorAnnotation(annotation.getAnnotationType());
            response.setAnnotationReason(annotation.getReason());
        }

        return response;
    }
}