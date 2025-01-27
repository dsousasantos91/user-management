package br.com.dsousasantos91.usermanagement.utils.annotations;

import br.com.dsousasantos91.usermanagement.utils.validators.ValidatorCNPJ;
import br.com.dsousasantos91.usermanagement.utils.validators.ValidatorCPF;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CpfCnpjValidator implements ConstraintValidator<CpfCnpj, String> {

    @Override
    public void initialize(CpfCnpj constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        value = value.replaceAll("\\D", "");

        Pattern pattern = Pattern.compile("[^0-9]");
        Matcher matcher = pattern.matcher(value);
        boolean containsNonDigits = matcher.find();
        if (containsNonDigits) {
            return false;
        }
        if (value.length() == 11) {
            return ValidatorCPF.isValid(value);
        }
        if (value.length() == 14) {
            return ValidatorCNPJ.isValid(value);
        }
        return false;
    }
}
