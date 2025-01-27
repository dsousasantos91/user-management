package br.com.dsousasantos91.usermanagement.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyUserRequest {

    @NotBlank(message = "O nome é obrigatório.")
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres.")
    private String name;

    @NotBlank(message = "O nome de usuário é obrigatório.")
    @Size(max = 50, message = "O nome de usuário deve ter no máximo 50 caracteres.")
    private String username;

    @Size(max = 255, message = "O endereço deve ter no máximo 255 caracteres.")
    private String address;

    @Pattern(
            regexp = "^\\(\\d{2}\\) \\d{4,5}-\\d{4}$",
            message = "O número de telefone deve estar no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX."
    )
    private String phoneNumber;
}
