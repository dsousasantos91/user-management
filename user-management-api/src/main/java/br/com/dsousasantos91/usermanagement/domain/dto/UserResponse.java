package br.com.dsousasantos91.usermanagement.domain.dto;

import br.com.dsousasantos91.usermanagement.utils.FormatterUtils;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private Long id;
    private String name;
    private String username;
    @Getter(AccessLevel.NONE)
    private String document;
    private String email;
    private Boolean active;
    private String address;
    @Getter(AccessLevel.NONE)
    private String phoneNumber;
    private ProfileResponse profile;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public String getDocument() {
        return FormatterUtils.formatDocument(this.document);
    }

    public String getPhoneNumber() {
        return FormatterUtils.formatPhoneNumber(this.phoneNumber);
    }
}
