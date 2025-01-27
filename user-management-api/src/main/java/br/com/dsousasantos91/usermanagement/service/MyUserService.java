package br.com.dsousasantos91.usermanagement.service;

import br.com.dsousasantos91.usermanagement.domain.dto.MyUserRequest;
import br.com.dsousasantos91.usermanagement.domain.dto.UserResponse;
import br.com.dsousasantos91.usermanagement.domain.model.User;
import br.com.dsousasantos91.usermanagement.mapper.UserMapper;
import br.com.dsousasantos91.usermanagement.repository.UserRepository;
import br.com.dsousasantos91.usermanagement.utils.PropertyUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MyUserService {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse updateUser(MyUserRequest request) {
        log.info("Update user [{}]", request.getUsername());
        User loggerdUser = getLoggedUser()
                .orElseThrow(() -> new RuntimeException("User not found"));
        User user = UserMapper.USER_MAPPER.toEntity(request);
        PropertyUtils.copyNonNullProperties(user, loggerdUser, "id", "document", "email", "ativo", "profile");
        User userUp = this.userRepository.save(loggerdUser);
        log.info("User [{}] update success.", loggerdUser.getUsername());
        return UserMapper.USER_MAPPER.toResponse(userUp);
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
