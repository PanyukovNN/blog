package org.reactivetales.blog.model.response;

import lombok.Builder;
import lombok.Getter;

/**
 * Ответ на аутентификацию пользователя.
 */
@Getter
@Builder
public class AuthResponse {

    private final UserResponse userResponse;

    /**
     * Токен доступа в формате JWT.
     */
    private final String accessToken;
}
