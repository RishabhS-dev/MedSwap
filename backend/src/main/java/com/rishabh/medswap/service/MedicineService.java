package com.rishabh.medswap.service;

import com.rishabh.medswap.dto.request.MedicineRequest;
import com.rishabh.medswap.dto.response.MedicineResponse;
import com.rishabh.medswap.entity.Medicine;
import com.rishabh.medswap.entity.Salt;
import com.rishabh.medswap.enums.SubmissionStatus;
import com.rishabh.medswap.repository.MedicineRepository;
import com.rishabh.medswap.repository.SaltRepository;
import com.rishabh.medswap.repository.SubstituteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicineService {

    private final MedicineRepository medicineRepository;
    private final SaltRepository saltRepository;
    private final SubstituteRepository substituteRepository;

    public MedicineResponse addMedicine(MedicineRequest request) {
        List<Salt> salts = resolveSalts(request.getSaltNames());

        Medicine medicine = Medicine.builder()
                .brandName(request.getBrandName())
                .manufacturer(request.getManufacturer())
                .dosageForm(request.getDosageForm())
                .strength(request.getStrength())
                .mrp(request.getMrp())
                .salts(salts)
                .status(SubmissionStatus.APPROVED)
                .build();

        medicineRepository.save(medicine);
        return toResponse(medicine);
    }

    public MedicineResponse getMedicineById(Long id) {
        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
        return toResponse(medicine);
    }

    public List<MedicineResponse> getAllApproved() {
        return medicineRepository.findByStatus(SubmissionStatus.APPROVED)
                .stream().map(this::toResponse).toList();
    }

    private List<Salt> resolveSalts(List<String> saltNames) {
        if (saltNames == null) return new ArrayList<>();
        return saltNames.stream().map(name ->
                saltRepository.findByNameIgnoreCase(name)
                        .orElseGet(() -> saltRepository.save(
                                Salt.builder().name(name).build()))
        ).toList();
    }

    public MedicineResponse toResponse(Medicine m) {
        return MedicineResponse.builder()
                .id(m.getId())
                .brandName(m.getBrandName())
                .manufacturer(m.getManufacturer())
                .dosageForm(m.getDosageForm())
                .strength(m.getStrength())
                .mrp(m.getMrp())
                .status(m.getStatus())
                .salts(m.getSalts() != null
                        ? m.getSalts().stream().map(Salt::getName).toList()
                        : List.of())
                .build();
    }
}