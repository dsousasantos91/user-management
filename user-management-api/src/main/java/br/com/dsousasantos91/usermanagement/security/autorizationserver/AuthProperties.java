package br.com.dsousasantos91.usermanagement.security.autorizationserver;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Map;

@Data
@Component
@Validated
@ConfigurationProperties("user.management")
public class AuthProperties {

    @NotBlank
    private String providerUri;

    @NotNull
    private JksProperties jks;

    @NotNull
    private Map<String, ClientConfig> client;

    @Data
    static class JksProperties {

        @NotBlank
        private String keypass;

        @NotBlank
        private String storepass;

        @NotBlank
        private String alias;

        @NotBlank
        private String path;
    }

    @Data
    public static class ClientConfig {

        @NotBlank
        private String clientId;

        @NotBlank
        private String clientSecret;
    }
}
