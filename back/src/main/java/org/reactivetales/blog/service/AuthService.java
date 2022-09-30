package org.reactivetales.blog.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.reactivetales.blog.model.response.SignInResponse;
import org.reactivetales.blog.model.entity.user.User;
import org.reactivetales.blog.model.request.AuthRequest;
import org.reactivetales.blog.model.request.ChangePasswordRequest;
import org.reactivetales.blog.model.request.UpdateAdminRequest;
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
import java.util.TimeZone;

import static org.reactivetales.blog.util.Constants.*;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JWTProperties jwtProperties;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;

    /**
     * Update admin.
     *
     * @param request update admin request
     */
    public User updateAdmin(UpdateAdminRequest request) {
        User admin = userRepository.findById(request.getId())
                .orElseThrow(() -> new EntityNotFoundException(ADMIN_NOT_AUTHENTICATED_ERROR));

        admin.setUsername(request.getUsername());
        admin.setEmail(request.getEmail());

        SecurityContextHolder.getContext().setAuthentication(null);

        return userRepository.save(admin);
    }

    /**
     * Authenticate user.
     *
     * @param request authentication request
     * @param timeZone client time zone
     * @return sing in info
     */
    public SignInResponse signIn(AuthRequest request, TimeZone timeZone) {
        String username = userRepository.findByEmailIgnoreCase(request.getEmail())
                .orElseThrow(() -> new EntityNotFoundException(ADMIN_NOT_FOUND_ERROR))
                .getUsername();

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, request.getPassword());
        Authentication authentication = authenticationManager.authenticate(authToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();
        String jwt = generateToken(user.getUsername(), timeZone);

        return SignInResponse.builder()
                .user(user)
                .jwt(jwt)
                .build();
    }

    /**
     * Change user password.
     *
     * @param request request params
     */
    public void changePassword(ChangePasswordRequest request) {
        User user = userRepository.findByEmailIgnoreCase(request.getEmail())
                .orElseThrow(() -> new EntityNotFoundException(ADMIN_NOT_FOUND_ERROR));

        boolean oldPasswordMatches = bCryptPasswordEncoder.matches(request.getOldPassword(), user.getPassword());

        if (!oldPasswordMatches) {
            throw new IllegalArgumentException(OLD_PASSWORD_DOES_NOT_MATCH_USER_PASSWORD);
        }

        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user.getUsername(), request.getPassword());
        Authentication authentication = authenticationManager.authenticate(authToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        userRepository.save(user);
    }

    /**
     * Generate user token.
     *
     * @param username name of user
     * @param timeZone client time zone
     * @return jwt token
     */
    private String generateToken(String username, TimeZone timeZone) {
        Date date = Date.from(LocalDate.now().plusDays(15).atStartOfDay(timeZone.toZoneId()).toInstant());

        return Jwts.builder()
                .setSubject(username)
                .setExpiration(date)
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getSecret())
                .compact();
    }
}
