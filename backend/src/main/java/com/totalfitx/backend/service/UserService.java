package com.totalfitx.backend.service;

import com.totalfitx.backend.model.Person;
import com.totalfitx.backend.model.PersonData;
import com.totalfitx.backend.model.Role;
import com.totalfitx.backend.model.User;
import com.totalfitx.backend.model.dto.UserRegistrationDto;
import com.totalfitx.backend.model.mapper.DtoMapper;
import com.totalfitx.backend.persistence.PersonDataRepository;
import com.totalfitx.backend.persistence.PersonRepository;
import com.totalfitx.backend.persistence.RoleRepository;
import com.totalfitx.backend.persistence.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PersonRepository personRepository;
    private final PersonDataRepository personDataRepository;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository,
                       PersonRepository personRepository, PersonDataRepository personDataRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.personRepository = personRepository;
        this.personDataRepository = personDataRepository;
    }
    public User registerNewUser(UserRegistrationDto registrationDto) {
        String cognitoUserId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("Registering new user with Cognito ID: {}", cognitoUserId);

        Optional<User> existingUser = userRepository.findByAwsCognitoSub(cognitoUserId);
        if (existingUser.isPresent()) {
            log.warn("User with Cognito ID {} already exists. Aborting registration.", cognitoUserId);
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with the given Cognito ID already exists");
        }

        Role defaultRole = roleRepository.findById(1L)
                .orElseThrow(() -> new IllegalArgumentException("Default role not found"));
        log.info("Assigned default role: {}", defaultRole);

        Person person = Person.builder()
                .firstName(registrationDto.getFirstName())
                .lastName(registrationDto.getLastName())
                .build();
        person = personRepository.save(person);
        log.info("Created Person entity: {}", person);

        PersonData personData = PersonData.builder()
                .person(person)
                .goalType(registrationDto.getGoalType())
                .goalWeight(BigDecimal.valueOf(registrationDto.getGoalWeight()))
                .initialWeight(BigDecimal.valueOf(registrationDto.getInitialWeight()))
                .activityLevel(registrationDto.getActivityLevel())
                .age(registrationDto.getAge())
                .build();
        personDataRepository.save(personData);
        log.info("Created PersonData entity: {}", personData);

        User user = DtoMapper.INSTANCE.mapToUser(registrationDto);
        user.setAwsCognitoSub(cognitoUserId);
        user.setRole(defaultRole);
        user.setPerson(person);
        User savedUser = userRepository.save(user);
        log.info("Successfully registered new user: {}", savedUser);

        return savedUser;
    }


    public Optional<User> getUserByCognitoUserId(String cognitoUserId) {
        try {
            log.atInfo().addKeyValue("cognitoUserId", cognitoUserId).log("Getting user for cognitoUserId: {}", cognitoUserId);
            var user = userRepository.findByAwsCognitoSub(cognitoUserId);
            if (user.isPresent()) {
                log.atInfo().addKeyValue("userId", user.get().getId()).log("Retrieved user with cognitoUserId: {}", cognitoUserId);
            } else {
                log.atWarn().addKeyValue("cognitoUserId", cognitoUserId).log("No user found for cognitoUserId: {}", cognitoUserId);
            }
            return user;
        } catch (Exception e) {
            log.atError().setCause(e).addKeyValue("cognitoUserId", cognitoUserId).log("Error while getting user for cognitoUserId: {}", cognitoUserId);
            throw e;
        }
    }

    public List<User> getAllUsers() {
        try {
            log.atInfo().log("Getting all users");
            var users = userRepository.findAll();
            log.atInfo().addKeyValue("count", users.size()).log("Retrieved {} users", users.size());
            return users;
        } catch (Exception e) {
            log.atError().setCause(e).log("Error while getting all users");
            throw e;
        }
    }





    public void deleteUser(Long id) {
        try {
            log.atInfo().addKeyValue("userId", id).log("Deleting user with id: {}", id);
            userRepository.deleteById(id);
            log.atInfo().addKeyValue("userId", id).log("Deleted user with id: {}", id);
        } catch (Exception e) {
            log.atError().setCause(e).addKeyValue("userId", id).log("Error while deleting user with id: {}", id);
            throw e;
        }
    }
}
