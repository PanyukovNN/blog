package org.reactivetales.blog.controller.validator;

import org.reactivetales.blog.model.request.ConfirmPasswordRequest;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Objects;

import static org.reactivetales.blog.util.Constants.CONFIRM_PASSWORD_KEY;

/**
 * Confirm password validator.
 */
public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, ConfirmPasswordRequest> {

    private String message;

    @Override
    public void initialize(PasswordMatches passwordMatches) {
        this.message = passwordMatches.message();
    }

    @Override
    public boolean isValid(ConfirmPasswordRequest request, ConstraintValidatorContext context) {
        boolean passwordsEquals = Objects.equals(request.getPassword(), request.getConfirmPassword());

        if (!passwordsEquals) {
            context
                    .buildConstraintViolationWithTemplate(message)
                    .addPropertyNode(CONFIRM_PASSWORD_KEY)
                    .addConstraintViolation()
                    .disableDefaultConstraintViolation();
        }

        return passwordsEquals;
    }
}
