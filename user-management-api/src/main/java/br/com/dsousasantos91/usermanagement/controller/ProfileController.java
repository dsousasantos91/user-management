package br.com.dsousasantos91.usermanagement.controller;

import br.com.dsousasantos91.usermanagement.domain.dto.ProfileRequest;
import br.com.dsousasantos91.usermanagement.domain.dto.ProfileResponse;
import br.com.dsousasantos91.usermanagement.security.authorities.CanReadMyUser;
import br.com.dsousasantos91.usermanagement.security.authorities.CanReadUsers;
import br.com.dsousasantos91.usermanagement.security.authorities.CanWriteUsers;
import br.com.dsousasantos91.usermanagement.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user-management/profiles")
public class ProfileController {

    private final ProfileService profileService;

    @CanReadMyUser
    @GetMapping
    public List<ProfileResponse> allProfiles() {
        return profileService.allProfiles();
    }

    @CanReadUsers
    @GetMapping("/{id}")
    public ProfileResponse getById(@PathVariable Long id) {
        return profileService.findProfile(id);
    }

    @CanWriteUsers
    @PostMapping
    public ProfileResponse createUser(@RequestBody ProfileRequest request) {
        return profileService.saveProfile(request);
    }

    @CanWriteUsers
    @PutMapping("/{id}")
    public ProfileResponse updateUser(@PathVariable Long id, @RequestBody ProfileRequest user) {
        return profileService.updateProfile(id, user);
    }

    @CanWriteUsers
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        profileService.deleteProfile(id);
    }
}
