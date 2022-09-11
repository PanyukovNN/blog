package org.reactivetales.blog.controller;

import lombok.RequiredArgsConstructor;
import org.reactivetales.blog.persistence.dto.AuthRequest;
import org.reactivetales.blog.persistence.dto.AuthResponse;
import org.reactivetales.blog.persistence.dto.UserDto;
import org.reactivetales.blog.persistence.dto.UserSignUpRequest;
import org.reactivetales.blog.persistence.entity.user.SignInResult;
import org.reactivetales.blog.persistence.entity.user.User;
import org.reactivetales.blog.service.AuthService;
import org.reactivetales.blog.service.mapper.UserMapper;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.TimeZone;

/**
 * Контроллер пользователей.
 */
@CrossOrigin
@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserMapper userMapper;
    private final AuthService authService;

    /**
     * Регистрация пользователя.
     *
     * @param request запрос
     * @param timeZone частовой пояс пользователя
     * @return сообщение об успешной регистрации
     */
    @PostMapping("/sign-up")
    public UserDto signUp(@RequestBody @Valid UserSignUpRequest request, TimeZone timeZone) {
        User user = new User();
        user.setId(request.getId());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        authService.signUpAdmin(user, timeZone);

        return userMapper.convert(user);
    }

    /**
     * Аутентификация пользователя.
     *
     * @param request запрос на аутентификацию пользователя
     * @param timeZone частовой пояс пользователя
     * @return ответ с токеном
     */
    @PostMapping("/sign-in")
    public AuthResponse signIn(@RequestBody @Valid AuthRequest request, TimeZone timeZone) {
        SignInResult signInResult = authService.signIn(request.getEmail(), request.getPassword(), timeZone);

        User user = signInResult.getUser();

        UserDto userDto = userMapper.convert(user);

        return AuthResponse.builder()
                .userDto(userDto)
                .accessToken(signInResult.getJwt())
                .build();
    }
}
