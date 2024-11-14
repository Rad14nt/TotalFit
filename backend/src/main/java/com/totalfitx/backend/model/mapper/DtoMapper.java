package com.totalfitx.backend.model.mapper;

import com.totalfitx.backend.model.*;
import com.totalfitx.backend.model.dto.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface DtoMapper {

    DtoMapper INSTANCE = Mappers.getMapper(DtoMapper.class);

    @Mapping(source = "role.name", target = "role")
    @Mapping(source = "person.firstName", target = "person")
    UserGetDto mapToGetDto(User entity);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "person", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    User mapToUser(UserRegistrationDto registrationDto);

}
