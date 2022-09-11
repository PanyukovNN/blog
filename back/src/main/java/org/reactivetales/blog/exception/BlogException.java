package org.reactivetales.blog.exception;

import lombok.NoArgsConstructor;

/**
 * Базовое исключение приложения.
 */
@NoArgsConstructor
public class BlogException extends RuntimeException {

    /**
     * Конструктор.
     *
     * @param message сообщение
     */
    public BlogException(String message) {
        super(message);
    }

    /**
     * Конструктор.
     *
     * @param message сообщение
     * @param e исключение
     */
    public BlogException(String message, Exception e) {
        super(message, e);
    }
}
