package org.reactivetales.blog.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.reactivetales.blog.exception.AuthException;
import org.reactivetales.blog.persistence.entity.user.Role;
import org.reactivetales.blog.persistence.entity.user.RoleName;
import org.reactivetales.blog.persistence.entity.user.SignInResult;
import org.reactivetales.blog.persistence.entity.user.User;
import org.reactivetales.blog.property.JWTProperties;
import org.reactivetales.blog.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.Date;
import java.util.Set;
import java.util.TimeZone;

import static org.reactivetales.blog.util.Constants.*;

/**
 * Сервис аутентификации.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final RoleService roleService;
    private final JWTProperties jwtProperties;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;

    /**
     * Регистрация пользователя.
     *
     * @param userTemplate частично заполненная сущность пользователя
     * @param timeZone частовой пояс пользователя
     */
    public void signUpAdmin(User userTemplate, TimeZone timeZone) {
        checkUserExistence(userTemplate);

        userTemplate.setPassword(bCryptPasswordEncoder.encode(userTemplate.getPassword()));
        userTemplate.setCreationDate(LocalDate.now(timeZone.toZoneId()));
        Set<Role> roles = Set.of(
                roleService.findByRoleName(RoleName.ROLE_USER),
                roleService.findByRoleName(RoleName.ROLE_ADMIN)
        );
        userTemplate.setRoles(roles);

        // Подтверждение по email, на данный момент отключено
        userTemplate.setActivationCode(null);

        userRepository.save(userTemplate);
    }

    /**
     * Провести аутентификацию пользователя.
     *
     * @param email почтовый ящик
     * @param password пароль
     * @param timeZone частовой пояс пользователя
     * @return результат аутентификации пользователя
     */
    public SignInResult signIn(String email, String password, TimeZone timeZone) {
        String username = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new EntityNotFoundException(USER_NOT_FOUND_ERROR))
                .getUsername();

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authentication = authenticationManager.authenticate(authToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();
        String jwt = generateToken(user.getUsername(), timeZone);

        return SignInResult.builder()
                .user(user)
                .jwt(jwt)
                .build();
    }

    /**
     * Сгенерировать токен пользователя.
     *
     * @param username имя пользователя
     * @param timeZone часовой пояс пользователя
     * @return JWT токен
     */
    private String generateToken(String username, TimeZone timeZone) {
        Date date = Date.from(LocalDate.now().plusDays(15).atStartOfDay(timeZone.toZoneId()).toInstant());

        return Jwts.builder()
                .setSubject(username)
                .setExpiration(date)
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getSecret())
                .compact();
    }

    /**
     * Выбрасываем исключение, если пользователь уже зарегистрирован.
     *
     * @param userTemplate частично заполенная сущность пользователя
     */
    private void checkUserExistence(User userTemplate) {
        boolean existsByUsername = userRepository.existsByUsernameIgnoreCase(userTemplate.getUsername());
        if (existsByUsername) {
            throw new AuthException(USER_ALREADY_EXISTS_BY_NAME);
        }

        boolean existsByEmail = userRepository.existsByEmailIgnoreCase(userTemplate.getEmail());
        if (existsByEmail) {
            throw new AuthException(USER_ALREADY_EXISTS_BY_EMAIL);
        }
    }
}
