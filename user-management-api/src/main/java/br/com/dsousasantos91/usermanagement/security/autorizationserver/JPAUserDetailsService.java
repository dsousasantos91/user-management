package br.com.dsousasantos91.usermanagement.security.autorizationserver;


import br.com.dsousasantos91.usermanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JPAUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        final var user = userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException(email));

        final var simpleGrantedAuthority = new SimpleGrantedAuthority("ROLE_" + user.getProfile().getName());

        return new User(
                user.getEmail(),
                user.getPassword(),
                List.of(simpleGrantedAuthority)
        );
    }

}
