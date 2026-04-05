package com.rishabh.medswap.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class MedicineRequest {
    @NotBlank String brandName;
    @NotBlank String manufacturer;
    String dosageForm;
    String strength;
    Double mrp;
    List<String> saltNames;
}