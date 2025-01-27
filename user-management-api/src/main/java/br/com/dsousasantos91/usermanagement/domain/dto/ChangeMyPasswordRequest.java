package br.com.dsousasantos91.usermanagement.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangeMyPasswordRequest {
    private String currentPassword;
    private String newPassword;
}
