package com.rishabh.medswap.dto.response;

import com.rishabh.medswap.enums.AnnotationType;
import lombok.*;

import java.util.List;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class SubstituteResponse {
    private Long id;
    private String brandName;
    private String manufacturer;
    private String dosageForm;
    private String strength;
    private Double mrp;
    private List<String> salts;
    private AnnotationType doctorAnnotation;
    private String annotationReason;
}