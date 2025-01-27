package br.com.dsousasantos91.usermanagement.security;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Order;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ResourceServerConfig {

	@Bean
	@Order(Ordered.LOWEST_PRECEDENCE)
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.formLogin()
				.loginPage("/login")
				.permitAll()
			.and()
			.authorizeRequests()
			.antMatchers("/login", "/logout","/css/**", "/js/**", "/images/**").permitAll()
			.antMatchers("/profiles/**").hasRole("ADMIN")
			.antMatchers("/users/**", "/profiles/**").hasAnyRole("ADMIN", "CLIENT")
			.anyRequest().authenticated()
			.and()
			.cors(Customizer.withDefaults())
			.csrf().disable()
			.oauth2ResourceServer()
			.jwt()
			.jwtAuthenticationConverter(jwtAuthenticationConverter());

		http.logout()
				.logoutUrl("/custom-logout")
				.logoutSuccessUrl("http://localhost:4200")
				.deleteCookies("JSESSIONID")
				.invalidateHttpSession(true)
				.clearAuthentication(true)
				.permitAll();

		return http.build();
	}

	private JwtAuthenticationConverter jwtAuthenticationConverter() {
		JwtAuthenticationConverter converter = new JwtAuthenticationConverter();

		converter.setJwtGrantedAuthoritiesConverter(
				jwt -> {
					List<String> userRoleAuthorities = jwt.getClaimAsStringList("authorities");

					if(userRoleAuthorities == null) {
						userRoleAuthorities = Collections.emptyList();
					}

					JwtGrantedAuthoritiesConverter scopesConverter = new JwtGrantedAuthoritiesConverter();

					Collection<GrantedAuthority> scopeAuthorities = scopesConverter.convert(jwt);

					scopeAuthorities
							.addAll(userRoleAuthorities.stream()
									.map(SimpleGrantedAuthority::new)
									.collect(Collectors.toList()));

					return scopeAuthorities;
				}
		);

		return converter;
	}


}
