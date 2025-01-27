package br.com.dsousasantos91.usermanagement.utils.annotations;

import javax.validation.Constraint;
import javax.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CpfCnpjValidator.class)
public @interface CpfCnpj {
    String message() default "Verifique o tipo de identificador inserido. Este campo deve conter apenas números";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
