package br.com.dsousasantos91.usermanagement.mapper;

import br.com.dsousasantos91.usermanagement.domain.dto.MyUserRequest;
import br.com.dsousasantos91.usermanagement.domain.dto.UserRequest;
import br.com.dsousasantos91.usermanagement.domain.dto.UserResponse;
import br.com.dsousasantos91.usermanagement.domain.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

    UserMapper USER_MAPPER = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "profileId", target = "profile.id")
    User toEntity(UserRequest request);
    User toEntity(MyUserRequest request);

    UserResponse toResponse(User user);
}
