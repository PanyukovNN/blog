package org.reactivetales.blog.controller.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;
import static org.reactivetales.blog.util.Constants.WRONG_PASSWORD_ERROR_MSG;

/**
 * Password validation annotation.
 */
@Documented
@Retention(RUNTIME)
@Target({ TYPE, FIELD, PARAMETER, ANNOTATION_TYPE })
@Constraint(validatedBy = PasswordConstraintValidator.class)
public @interface ValidPassword {

	String message() default WRONG_PASSWORD_ERROR_MSG;

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
