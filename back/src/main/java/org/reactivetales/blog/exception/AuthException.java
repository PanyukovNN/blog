package org.reactivetales.blog.exception;

import lombok.NoArgsConstructor;

/**
 * Authentication exception.
 */
@NoArgsConstructor
public class AuthException extends BlogException {

    public AuthException(String message) {
        super(message);
    }

    public AuthException(String message, Exception e) {
        super(message, e);
    }
}
