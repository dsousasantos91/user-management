package br.com.dsousasantos91.usermanagement.controller;

import br.com.dsousasantos91.usermanagement.domain.dto.ChangeMyPasswordRequest;
import br.com.dsousasantos91.usermanagement.domain.dto.MyUserRequest;
import br.com.dsousasantos91.usermanagement.domain.dto.UserResponse;
import br.com.dsousasantos91.usermanagement.security.authorities.CanReadMyUser;
import br.com.dsousasantos91.usermanagement.security.authorities.CanWriteMyUser;
import br.com.dsousasantos91.usermanagement.service.MyUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user-management/myuser")
public class MyUserController {

    private final MyUserService myUserService;

    @CanReadMyUser
    @GetMapping
    public UserResponse getMyUser() {
        return myUserService.getMyUser();
    }

    @CanWriteMyUser
    @PutMapping
    public UserResponse updateUser(@RequestBody MyUserRequest myUser) {
        return myUserService.updateUser(myUser);
    }

    @CanWriteMyUser
    @PostMapping("/change-password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@RequestBody ChangeMyPasswordRequest changeMyPasswordRequest) {
        myUserService.changePassword(changeMyPasswordRequest.getCurrentPassword(), changeMyPasswordRequest.getNewPassword());
    }
}
