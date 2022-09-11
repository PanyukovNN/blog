package org.reactivetales.blog.exception;

import lombok.NoArgsConstructor;

/**
 * Исключение при регистрации/аутентификации.
 */
@NoArgsConstructor
public class AuthException extends BlogException {

    /**
     * Конструктор.
     *
     * @param message сообщение
     */
    public AuthException(String message) {
        super(message);
    }

    /**
     * Конструктор.
     *
     * @param message сообщение
     * @param e исключение
     */
    public AuthException(String message, Exception e) {
        super(message, e);
    }
}
