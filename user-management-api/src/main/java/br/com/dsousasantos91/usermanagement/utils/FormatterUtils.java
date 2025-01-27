package br.com.dsousasantos91.usermanagement.utils;

public class FormatterUtils {

    private static final int CPF_SIZE = 11;
    private static final int CNPJ_SIZE = 14;
    private static final int PHONENUMBER_DEFAULT_SIZE = 10;
    private static final int PHONENUMBER_MOBILE_SIZE= 11;

    public static String formatDocument(String document) {
        if (document == null) return null;
        if (document.length() == CPF_SIZE) {
            return document.replaceFirst("(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "$1.$2.$3-$4");
        }
        if (document.length() == CNPJ_SIZE) {
            return document.replaceFirst("(\\d{2})(\\d{3})(\\d{3})(\\d{4})(\\d{2})", "$1.$2.$3/$4-$5");
        }
        return document;
    }

    public static String formatPhoneNumber(String phoneNumber) {
        if (phoneNumber == null) return null;
        if (phoneNumber.length() == PHONENUMBER_DEFAULT_SIZE) {
            return phoneNumber.replaceFirst("(\\d{2})(\\d{4})(\\d{4})", "($1) $2-$3");
        }
        if (phoneNumber.length() == PHONENUMBER_MOBILE_SIZE) {
            return phoneNumber.replaceFirst("(\\d{2})(\\d{5})(\\d{4})", "($1) $2-$3");
        }
        return phoneNumber;
    }
}
