package com.rishabh.medswap.controller;

import com.rishabh.medswap.dto.response.MedicineResponse;
import com.rishabh.medswap.dto.response.SubstituteResponse;
import com.rishabh.medswap.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping
    public ResponseEntity<List<MedicineResponse>> search(@RequestParam String query) {
        return ResponseEntity.ok(searchService.search(query));
    }

    @GetMapping("/{medicineId}/substitutes")
    public ResponseEntity<List<SubstituteResponse>> getSubstitutes(@PathVariable Long medicineId) {
        return ResponseEntity.ok(searchService.getSubstitutes(medicineId));
    }
}