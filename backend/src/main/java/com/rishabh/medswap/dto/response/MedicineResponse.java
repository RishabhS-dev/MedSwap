package com.rishabh.medswap.dto.response;

import com.rishabh.medswap.enums.SubmissionStatus;
import lombok.*;

import java.util.List;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class MedicineResponse {
    private Long id;
    private String brandName;
    private String manufacturer;
    private String dosageForm;
    private String strength;
    private Double mrp;
    private SubmissionStatus status;
    private List<String> salts;
}