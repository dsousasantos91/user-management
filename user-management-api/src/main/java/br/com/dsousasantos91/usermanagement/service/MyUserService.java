package br.com.dsousasantos91.usermanagement.service;

import br.com.dsousasantos91.usermanagement.domain.dto.MyUserRequest;
import br.com.dsousasantos91.usermanagement.domain.dto.UserResponse;
import br.com.dsousasantos91.usermanagement.domain.model.User;
import br.com.dsousasantos91.usermanagement.mapper.UserMapper;
import br.com.dsousasantos91.usermanagement.repository.ProfileRepository;
import br.com.dsousasantos91.usermanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyUserService {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse updateUser(MyUserRequest request) {
        return getLoggedUser()
                .map(existent -> {
                    existent.setName(request.getName());
                    profileRepository.save(existent.getProfile());
                    userRepository.save(existent);
                    return UserMapper.USER_MAPPER.toResponse(existent);
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserResponse getMyUser() {
        return getLoggedUser()
                .map(UserMapper.USER_MAPPER::toResponse)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Optional<User> getLoggedUser() {
        return Optional.of(authService.getCurrentAuthenticatedUser());
    }

    public void changePassword(String currentPassword, String newPassword) {
        User user = authService.getCurrentAuthenticatedUser();
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }
        String encodedNewPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedNewPassword);
        userRepository.save(user);
    }
}
