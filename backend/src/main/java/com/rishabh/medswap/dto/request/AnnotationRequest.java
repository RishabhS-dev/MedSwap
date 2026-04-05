package com.rishabh.medswap.dto.request;

import com.rishabh.medswap.enums.AnnotationType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AnnotationRequest {
    @NotNull Long medicineId;
    @NotNull Long substituteId;
    @NotNull AnnotationType annotationType;
    String reason;
}