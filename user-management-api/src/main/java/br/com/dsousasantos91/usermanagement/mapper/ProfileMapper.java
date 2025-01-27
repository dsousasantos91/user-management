package br.com.dsousasantos91.usermanagement.mapper;

import br.com.dsousasantos91.usermanagement.domain.dto.ProfileRequest;
import br.com.dsousasantos91.usermanagement.domain.dto.ProfileResponse;
import br.com.dsousasantos91.usermanagement.domain.model.Profile;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProfileMapper {

    ProfileMapper PROFILE_MAPPER = Mappers.getMapper(ProfileMapper.class);

    Profile toEntity(ProfileRequest request);

    ProfileResponse toResponse(Profile profile);
}
