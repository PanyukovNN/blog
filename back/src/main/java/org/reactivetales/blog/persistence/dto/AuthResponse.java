package org.reactivetales.blog.persistence.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * Ответ на аутентификацию пользователя.
 */
@Getter
@Builder
public class AuthResponse {

    private final UserDto userDto;

    /**
     * Токен доступа в формате JWT.
     */
    private final String accessToken;
}
