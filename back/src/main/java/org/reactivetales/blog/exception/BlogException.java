package org.reactivetales.blog.exception;

import lombok.NoArgsConstructor;

/**
 * Base app exception.
 */
@NoArgsConstructor
public class BlogException extends RuntimeException {

    public BlogException(String message) {
        super(message);
    }

    public BlogException(String message, Exception e) {
        super(message, e);
    }
}
