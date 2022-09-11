package org.reactivetales.blog.persistence.dto;

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
public class UserDto {

    private String username;
    private String email;
    private String creationDate;
    private List<String> roles;
}
