package br.com.dsousasantos91.usermanagement.security.autorizationserver;

import lombok.Getter;
import org.springframework.security.authentication.AbstractAuthenticationToken;

import java.util.Map;

public class ClientAuthenticationToken extends AbstractAuthenticationToken {
    private final String clientId;
    private final String clientSecret;
    @Getter
    private final Map<String, String> parameters;

    public ClientAuthenticationToken(String clientId, String clientSecret, Map<String, String> parameters) {
        super(null);
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.parameters = parameters;
        setAuthenticated(false);
    }

    @Override
    public Object getCredentials() {
        return this.clientSecret;
    }

    @Override
    public Object getPrincipal() {
        return this.clientId;
    }

}

