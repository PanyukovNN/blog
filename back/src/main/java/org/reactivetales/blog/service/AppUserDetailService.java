package org.reactivetales.blog.service;

import lombok.RequiredArgsConstructor;
import org.reactivetales.blog.exception.AuthException;
import org.reactivetales.blog.persistence.entity.user.User;
import org.reactivetales.blog.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static org.reactivetales.blog.util.Constants.USER_NOT_ACTIVATED;
import static org.reactivetales.blog.util.Constants.USER_NOT_FOUND_ERROR;

/**
 * Сервис пработы с информацией о пользователях.
 */
@Service
@RequiredArgsConstructor
public class AppUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new AuthException(USER_NOT_FOUND_ERROR));

        if (user.getActivationCode() != null) {
            throw new AuthException(String.format(USER_NOT_ACTIVATED, user.getUsername()));
        }

        return user;
    }
}
