package org.reactivetales.blog.controller;

import lombok.extern.slf4j.Slf4j;
import org.reactivetales.blog.model.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.persistence.EntityNotFoundException;
import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Common exception handler
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final String BAD_REQUEST_MSG = "Wrong request structure or parameters";
    private static final String ENTITY_NOT_FOUND_MSG = "Requested page not found";
    private static final String INTERNAL_SERVER_ERROR_MSG = "Something's gone wrong";

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({ConstraintViolationException.class})
    public ErrorResponse handleBadRequestException(Exception ex) {
        log.warn("BadRequest: " + ex.getMessage(), ex);

        return ErrorResponse.builder()
                .message(BAD_REQUEST_MSG)
                .status(HttpStatus.BAD_REQUEST.value())
                .build();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        String invalidFieldsMessage = fieldErrors
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining("; "));

        return ErrorResponse.builder()
                .message(invalidFieldsMessage)
                .status(HttpStatus.BAD_REQUEST.value())
                .build();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({EntityNotFoundException.class})
    public ErrorResponse handleEntityNotFoundException(Exception ex) {
        log.warn("EntityNotFound: " + ex.getMessage(), ex);

        return ErrorResponse.builder()
                .message(ENTITY_NOT_FOUND_MSG)
                .status(HttpStatus.BAD_REQUEST.value())
                .build();
    }

    /**
     * Handle all unhandled errors.
     *
     * @param ex exception
     * @return response message
     */
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ErrorResponse handleException(Exception ex) {
        log.warn("InternalServerError: " + ex.getMessage(), ex);

        return ErrorResponse.builder()
                .message(INTERNAL_SERVER_ERROR_MSG)
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .build();
    }
}