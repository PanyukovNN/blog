package org.reactivetales.blog.model.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Транспортный объект пользователя.
 */
@Getter
@Setter
@NoArgsConstructor
public class UserResponse {

    private String username;
    private String email;
    private List<String> roles;
}
