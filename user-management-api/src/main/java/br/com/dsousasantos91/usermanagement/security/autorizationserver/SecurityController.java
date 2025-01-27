package br.com.dsousasantos91.usermanagement.security.autorizationserver;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SecurityController {

    @GetMapping("/login")
    public String login(Model model, AuthProperties authProperties) {
        model.addAttribute("angularAppUrl", authProperties.getWebClientRedirect());
        return "pages/login";
    }

    @GetMapping("/logout")
    public String logout() {
        return "pages/logout";
    }
}
