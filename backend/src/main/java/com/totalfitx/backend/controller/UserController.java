package com.totalfitx.backend.controller;

import com.totalfitx.backend.model.User;
import com.totalfitx.backend.model.dto.UserGetDto;
import com.totalfitx.backend.model.dto.UserRegistrationDto;
import com.totalfitx.backend.model.mapper.DtoMapper;
import com.totalfitx.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }



    @Operation(
            summary = "Find User by Cognito User Id",
            responses = {@ApiResponse(responseCode = "200", description = "Successfully found User")}
    )
    @GetMapping("/data")
    public ResponseEntity<UserGetDto> getUserByCognitoUserId() {
        String cognitoUserId = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("Received request to get user with cognitoUserId: {}", cognitoUserId);

        try {
            return userService.getUserByCognitoUserId(cognitoUserId)
                    .map(user -> ResponseEntity.ok(DtoMapper.INSTANCE.mapToGetDto(user)))
                    .orElseGet(() -> {
                        log.warn("No user found for cognitoUserId: {}", cognitoUserId);
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                    });
        } catch (Exception e) {
            log.error("Error while getting user with cognitoUserId from token", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @Operation(summary = "Register a new user")
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserGetDto registerUser(@Valid @RequestBody UserRegistrationDto registrationDto) {
        log.info("Received request to register a new user: {}", registrationDto);
        String cognitoUserId = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("Registering user with cognito id: {}", cognitoUserId);

        try {
            User newUser = userService.registerNewUser(registrationDto);
            log.info("User registered successfully: {}", newUser);
            return DtoMapper.INSTANCE.mapToGetDto(newUser);
        } catch (ResponseStatusException e) {
            log.warn("Conflict while registering user: {}", e.getReason(), e);
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error while registering user", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "User registration failed", e);
        }
    }

    @Operation(
            summary = "Get all users",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successfully retrieved all users")
            })
    @GetMapping
    public List<UserGetDto> getAllUsers() {
        try {
            log.atInfo().log("Received request to retrieve all users");
            var users = userService.getAllUsers().stream().map(DtoMapper.INSTANCE::mapToGetDto).toList();
            log.atInfo().addKeyValue("count", users.size()).log("Retrieved {} users", users.size());
            return users;
        } catch (Exception e) {
            log.atError().setCause(e).log("Error while retrieving all users.");
            throw e;
        }
    }


    @Operation(
            summary = "Delete User using Id",
            responses = {@ApiResponse(responseCode = "200", description = "Successfully deleted User")})
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        try {
            log.atInfo().addKeyValue("userId", id).log("Received request to delete user with id: {}", id);
            userService.deleteUser(id);
        } catch (Exception e) {
            log.atError().setCause(e).log("Error while deleting user with id {}.", id);
            throw e;
        }
    }
}
