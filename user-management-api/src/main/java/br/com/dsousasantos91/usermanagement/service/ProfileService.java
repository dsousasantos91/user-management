package br.com.dsousasantos91.usermanagement.service;

import br.com.dsousasantos91.usermanagement.domain.dto.ProfileRequest;
import br.com.dsousasantos91.usermanagement.domain.dto.ProfileResponse;
import br.com.dsousasantos91.usermanagement.domain.model.Profile;
import br.com.dsousasantos91.usermanagement.mapper.ProfileMapper;
import br.com.dsousasantos91.usermanagement.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileResponse saveProfile(ProfileRequest request) {
        Profile profile = Optional.ofNullable(request)
                .map(ProfileMapper.PROFILE_MAPPER::toEntity)
                .orElseThrow(IllegalArgumentException::new);
        Profile profileSave = profileRepository.save(profile);
        return ProfileMapper.PROFILE_MAPPER.toResponse(profileSave);
    }

    public ProfileResponse findProfile(Long id) {
        return profileRepository.findById(id)
                .map(ProfileMapper.PROFILE_MAPPER::toResponse)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    public ProfileResponse updateProfile(Long id, ProfileRequest request) {
        return profileRepository.findById(id)
                .map(existent -> {
                    existent.setName(request.getName());
                    profileRepository.save(existent);
                    return ProfileMapper.PROFILE_MAPPER.toResponse(existent);
                })
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    public List<ProfileResponse> allProfiles() {
        return profileRepository.findAll()
                .stream()
                .map(ProfileMapper.PROFILE_MAPPER::toResponse)
                .collect(Collectors.toList());
    }

    public void deleteProfile(Long id) {
        profileRepository.deleteById(id);
    }
}
