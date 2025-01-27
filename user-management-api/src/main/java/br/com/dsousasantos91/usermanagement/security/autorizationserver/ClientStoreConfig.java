package br.com.dsousasantos91.usermanagement.security.autorizationserver;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.server.authorization.client.JdbcRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.ClientSettings;
import org.springframework.security.oauth2.server.authorization.config.TokenSettings;

import java.time.Duration;

@Configuration
public class ClientStoreConfig {

    @Bean
    public RegisteredClientRepository registeredClientRepository(PasswordEncoder passwordEncoder,
                                                                 JdbcTemplate jdbcTemplate,
                                                                 AuthProperties authProperties) {

        var backendClientProperties = authProperties.getClient().get("backendClient");
        RegisteredClient integrationClient = RegisteredClient
                .withId("1")
                .clientId(backendClientProperties.getClientId())
                .clientSecret(passwordEncoder.encode(backendClientProperties.getClientSecret()))
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                .scope("users:read")
                .scope("users:write")
                .tokenSettings(TokenSettings.builder()
                        .accessTokenTimeToLive(Duration.ofMinutes(5))
                        .build())
                .clientSettings(ClientSettings.builder()
                        .requireAuthorizationConsent(false)
                        .build())
                .build();

        var webClientProperties = authProperties.getClient().get("webClient");
        RegisteredClient webClient = RegisteredClient
                .withId("2")
                .clientId(webClientProperties.getClientId())
                .clientSecret(passwordEncoder.encode(webClientProperties.getClientSecret()))
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                .redirectUri("https://oidcdebugger.com/debug")
                .redirectUri("https://oauthdebugger.com/debug")
                .redirectUri("https://oauth.pstmn.io/v1/callback")
                .redirectUri("http://127.0.0.1:4200/authorized")
                .scope(OidcScopes.OPENID)
                .scope(OidcScopes.PROFILE)
                .scope("myuser:read")
                .scope("myuser:write")
                .tokenSettings(TokenSettings.builder()
                        .accessTokenTimeToLive(Duration.ofMinutes(5))
                        .refreshTokenTimeToLive(Duration.ofMinutes(15))
                        .build())
                .clientSettings(ClientSettings.builder()
                        .requireAuthorizationConsent(false).build())
                .build();

        JdbcRegisteredClientRepository clientRepository = new JdbcRegisteredClientRepository(jdbcTemplate);

        clientRepository.save(integrationClient);
        clientRepository.save(webClient);
        return clientRepository;
    }
}
