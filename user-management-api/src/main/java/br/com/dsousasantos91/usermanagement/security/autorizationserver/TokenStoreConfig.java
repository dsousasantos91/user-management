package br.com.dsousasantos91.usermanagement.security.autorizationserver;

import br.com.dsousasantos91.usermanagement.domain.model.User;
import br.com.dsousasantos91.usermanagement.repository.UserRepository;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;

import java.io.InputStream;
import java.security.KeyStore;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Configuration
public class TokenStoreConfig {

    @Bean
    public OAuth2TokenCustomizer<JwtEncodingContext> jwtDecoderCustomizer(UserRepository userRepository) {
        return (context -> {
            Authentication authentication = context.getPrincipal();

            Optional.ofNullable(authentication)
                    .filter(auth -> auth.getPrincipal() instanceof org.springframework.security.core.userdetails.User)
                    .map(auth -> (org.springframework.security.core.userdetails.User) auth.getPrincipal())
                    .ifPresent(user -> jwtCustomizer(userRepository, context, user));
        });
    }

    @Bean
    public JWKSet jwkSet(AuthProperties authProperties) throws Exception {
        final var jksProperties = authProperties.getJks();
        final String path = jksProperties.getPath();
        final InputStream inputStream = new ClassPathResource(path).getInputStream();

        final KeyStore keyStore = KeyStore.getInstance("JKS");
        keyStore.load(inputStream, jksProperties.getStorepass().toCharArray());
        RSAKey rsaKey = RSAKey.load(keyStore,
                jksProperties.getAlias(),
                jksProperties.getStorepass().toCharArray());

        return new JWKSet(rsaKey);
    }

    @Bean
    public JWKSource<SecurityContext> jwkSource(JWKSet jwkSet) {
        return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet);
    }

    @Bean
    public JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwkSource) {
        return new NimbusJwtEncoder(jwkSource);
    }

  private static void jwtCustomizer(UserRepository userRepository, JwtEncodingContext context, org.springframework.security.core.userdetails.User user) {
    User existent = userRepository.findByEmail(user.getUsername()).orElseThrow();

    Set<String> authorities = user.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toSet());

    context.getClaims().claim("user_id", existent.getId().toString());
    context.getClaims().claim("user_fullname", existent.getName());
    context.getClaims().claim("authorities", authorities);
  }

}
