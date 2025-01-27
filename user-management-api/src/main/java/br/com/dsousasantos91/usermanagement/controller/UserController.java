package br.com.dsousasantos91.usermanagement.controller;

import br.com.dsousasantos91.usermanagement.domain.dto.ChangeMyPasswordRequest;
import br.com.dsousasantos91.usermanagement.domain.dto.UserRequest;
import br.com.dsousasantos91.usermanagement.domain.dto.UserResponse;
import br.com.dsousasantos91.usermanagement.security.authorities.CanReadUsers;
import br.com.dsousasantos91.usermanagement.security.authorities.CanWriteUsers;
import br.com.dsousasantos91.usermanagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@Validated
@RestController
@RequestMapping("/user-management/users")
public class UserController {

    private final UserService userService;

    @CanReadUsers
    @GetMapping
    public List<UserResponse> allUsers() {
        return userService.allUsers();
    }

    @CanReadUsers
    @GetMapping("/{id}")
    public UserResponse getById(@PathVariable Long id) {
        return userService.findUser(id);
    }

    @CanWriteUsers
    @PostMapping
    public UserResponse createUser(@Valid @RequestBody UserRequest request) {
        return userService.saveUser(request);
    }

    @CanWriteUsers
    @PutMapping("/{id}")
    public UserResponse updateUser(@PathVariable Long id, @Valid @RequestBody UserRequest user) {
        return userService.updateUser(id, user);
    }

    @CanWriteUsers
    @PostMapping("/change-password/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@PathVariable Long id, @RequestBody ChangeMyPasswordRequest changeMyPasswordRequest) {
        userService.changePassword(id, changeMyPasswordRequest.getNewPassword());
    }

    @CanWriteUsers
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
