package br.com.dsousasantos91.usermanagement.service;

import br.com.dsousasantos91.usermanagement.domain.model.User;
import br.com.dsousasantos91.usermanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public String getLoggedUserEmail() {
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return jwt.getClaim("sub");
    }

    public String getLoggedUserName() {
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return jwt.getClaim("user_fullname");
    }

    public User getCurrentAuthenticatedUser() {
        String userEmail = getLoggedUserEmail();
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
