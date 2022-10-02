package org.reactivetales.blog.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class BadRequestException extends BlogException {

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Exception e) {
        super(message, e);
    }
}
