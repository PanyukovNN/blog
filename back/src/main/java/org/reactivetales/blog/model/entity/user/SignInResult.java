package org.reactivetales.blog.model.entity.user;

import lombok.Builder;
import lombok.Getter;

/**
 * Результат аутентификации пользователя.
 */
@Getter
@Builder
public class SignInResult {

    private final User user;

    /**
     * Токен доступа в формате jwt.
     */
    private final String jwt;
}
