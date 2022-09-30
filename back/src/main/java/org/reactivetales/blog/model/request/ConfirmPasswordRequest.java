package org.reactivetales.blog.model.request;

import lombok.Getter;
import lombok.Setter;
import org.reactivetales.blog.controller.validator.PasswordMatches;
import org.reactivetales.blog.controller.validator.ValidPassword;

import javax.validation.constraints.NotBlank;

import static org.reactivetales.blog.util.Constants.*;

@Getter
@Setter
@PasswordMatches
public class ConfirmPasswordRequest {

    @ValidPassword
    @NotBlank(message = BLANK_PASSWORD_ERROR_MSG)
    private String password;

    @NotBlank(message = BLANK_CONFIRM_PASSWORD_ERROR_MSG)
    private String confirmPassword;
}
