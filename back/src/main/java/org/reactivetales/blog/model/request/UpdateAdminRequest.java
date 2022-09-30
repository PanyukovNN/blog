package org.reactivetales.blog.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import static org.reactivetales.blog.util.Constants.*;

@Getter
@Setter
@NoArgsConstructor
public class UpdateAdminRequest {

    private Long id;

    @NotBlank(message = BLANK_USER_NAME_ERROR_MSG)
    private String username;

    @Email(message = WRONG_EMAIL_ERROR_MSG)
    @NotBlank(message = BLANK_EMAIL_ERROR_MSG)
    private String email;
}
