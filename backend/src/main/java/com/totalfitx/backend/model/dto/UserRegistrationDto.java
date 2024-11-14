package com.totalfitx.backend.model.dto;
import jakarta.validation.constraints.NotNull;

import lombok.Data;

@Data
public class UserRegistrationDto {
    @NotNull
    private String email;
    @NotNull
    private String username;
    private String firstName;
    private String lastName;
    private String goalType;
    private String sex;

    private Double goalWeight;
    private Double initialWeight;
    private String activityLevel;
    private Integer age;
}
