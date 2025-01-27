package br.com.dsousasantos91.usermanagement.service;

import br.com.dsousasantos91.usermanagement.domain.dto.UserRequest;
import br.com.dsousasantos91.usermanagement.domain.dto.UserResponse;
import br.com.dsousasantos91.usermanagement.domain.model.Profile;
import br.com.dsousasantos91.usermanagement.domain.model.User;
import br.com.dsousasantos91.usermanagement.mapper.UserMapper;
import br.com.dsousasantos91.usermanagement.repository.ProfileRepository;
import br.com.dsousasantos91.usermanagement.repository.UserRepository;
import br.com.dsousasantos91.usermanagement.utils.PropertyUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    @Value("${app.defaultPassword}")
    private String defaultPassword;

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse saveUser(UserRequest request) {
        User user = Optional.ofNullable(request)
                .map(UserMapper.USER_MAPPER::toEntity)
                .orElseThrow(IllegalArgumentException::new);
        Profile profile = Optional.ofNullable(request.getProfileId())
                .map(profileRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        user.setPassword(defaultPassword);
        user.setProfile(profile);
        User userSave = userRepository.save(user);
        return UserMapper.USER_MAPPER.toResponse(userSave);
    }

    public UserResponse findUser(Long id) {
        return userRepository.findById(id)
                .map(UserMapper.USER_MAPPER::toResponse)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserResponse updateUser(Long id, UserRequest request) {
        log.info("Update user ID [{}]", id);
        User userFind = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User user = UserMapper.USER_MAPPER.toEntity(request);
        PropertyUtils.copyNonNullProperties(user, userFind, "id", "email");
        User userUp = this.userRepository.save(userFind);
        log.info("User ID [{}] update success.", userFind.getId());
        return UserMapper.USER_MAPPER.toResponse(userUp);
    }

    public List<UserResponse> allUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper.USER_MAPPER::toResponse)
                .collect(Collectors.toList());
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void changePassword(Long id, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        String encodedNewPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedNewPassword);
        userRepository.save(user);
    }
}
