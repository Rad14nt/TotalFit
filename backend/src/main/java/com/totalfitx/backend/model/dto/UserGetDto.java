package com.totalfitx.backend.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record UserGetDto(
        @NotNull Long id,
        @NotBlank String cognitoUserId,
        @Email @NotNull String email,
        @NotNull LocalDateTime createdAt,
        @NotNull LocalDateTime updatedAt,
        @NotNull String role,
        @NotNull String person
) {}
