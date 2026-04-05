package com.rishabh.medswap.dto.response;

import com.rishabh.medswap.enums.DoctorStatus;
import com.rishabh.medswap.enums.Role;
import lombok.*;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private Role role;
    private DoctorStatus doctorStatus;
    private String specialisation;
}