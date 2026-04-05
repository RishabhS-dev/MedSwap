package com.rishabh.medswap.controller;

import com.rishabh.medswap.dto.request.MedicineRequest;
import com.rishabh.medswap.dto.response.MedicineResponse;
import com.rishabh.medswap.service.MedicineService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@RequiredArgsConstructor
public class MedicineController {

    private final MedicineService medicineService;

    @GetMapping
    public ResponseEntity<List<MedicineResponse>> getAll() {
        return ResponseEntity.ok(medicineService.getAllApproved());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(medicineService.getMedicineById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MedicineResponse> add(@Valid @RequestBody MedicineRequest request) {
        return ResponseEntity.ok(medicineService.addMedicine(request));
    }
}