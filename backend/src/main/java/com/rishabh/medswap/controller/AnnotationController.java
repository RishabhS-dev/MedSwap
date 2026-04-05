package com.rishabh.medswap.controller;

import com.rishabh.medswap.dto.request.AnnotationRequest;
import com.rishabh.medswap.entity.Annotation;
import com.rishabh.medswap.entity.User;
import com.rishabh.medswap.service.AnnotationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/annotations")
@RequiredArgsConstructor
public class AnnotationController {

    private final AnnotationService annotationService;

    @PostMapping
    public ResponseEntity<Annotation> annotate(
            @Valid @RequestBody AnnotationRequest request,
            @AuthenticationPrincipal User doctor) {
        return ResponseEntity.ok(annotationService.addAnnotation(request, doctor));
    }
}