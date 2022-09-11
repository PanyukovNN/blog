package org.reactivetales.blog.persistence.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import static org.reactivetales.blog.util.Constants.*;

/**
 * Запрос аутентификации пользователя.
 */
@Getter
@Setter
public class LogoutRequest {

	@Email(message = WRONG_EMAIL_ERROR_MSG)
	@NotBlank(message = BLANK_EMAIL_ERROR_MSG)
	private String email;

	@NotBlank(message = BLANK_PASSWORD_ERROR_MSG)
	private String password;
}
