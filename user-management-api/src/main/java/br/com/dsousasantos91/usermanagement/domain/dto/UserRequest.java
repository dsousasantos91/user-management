package br.com.dsousasantos91.usermanagement.domain.dto;

import br.com.dsousasantos91.usermanagement.utils.annotations.CpfCnpj;
import lombok.*;

import javax.validation.constraints.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    @NotBlank(message = "O nome é obrigatório.")
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres.")
    private String name;

    @NotBlank(message = "O nome de usuário é obrigatório.")
    @Size(max = 50, message = "O nome de usuário deve ter no máximo 50 caracteres.")
    private String username;

    @NotBlank(message = "O documento é obrigatório.")
    @Pattern(
            regexp = "(^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$)|(^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$)",
            message = "O documento deve ser um CPF ou CNPJ válido."
    )
    @CpfCnpj
    private String document;

    @NotBlank(message = "O e-mail é obrigatório.")
    @Email(message = "O e-mail deve ser válido.")
    @Size(max = 100, message = "O e-mail deve ter no máximo 100 caracteres.")
    private String email;

    @NotNull(message = "O status ativo/inativo é obrigatório.")
    private Boolean active;

    @Size(max = 255, message = "O endereço deve ter no máximo 255 caracteres.")
    private String address;

    @Pattern(
            regexp = "^\\(\\d{2}\\) \\d{4,5}-\\d{4}$",
            message = "O número de telefone deve estar no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX."
    )
    private String phoneNumber;

    @NotNull(message = "O status perfil é obrigatório.")
    private Long profileId;
}

