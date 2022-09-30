package org.reactivetales.blog.model.response;

import lombok.Builder;
import lombok.Getter;

/**
 * User authentication response.
 */
@Getter
@Builder
public class AuthResponse {

    private final UserResponse userResponse;

    private final String accessToken;
}
