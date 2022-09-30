package org.reactivetales.blog.model.response;

import lombok.Builder;
import lombok.Getter;
import org.reactivetales.blog.model.entity.user.User;

/**
 * User sign in result.
 */
@Getter
@Builder
public class SignInResponse {

    private final User user;

    /**
     * Access token.
     */
    private final String jwt;
}
