package com.example.forum.advice;

import com.example.forum.dto.response.MessageResponse;
import com.example.forum.exception.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionAdvice {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionAdvice.class);

    private ResponseEntity<MessageResponse> buildResponse(HttpStatus status, String message, Exception exception) {
        if (status.is5xxServerError()) {
            logger.error(message, exception);
        } else {
            logger.warn(message, exception);
        }
        return new ResponseEntity<>(new MessageResponse(message), status);
    }

    @ExceptionHandler({
            BadRequestException.class,
            ValidationException.class,
            CommentTooLongException.class,
            HttpMessageNotReadableException.class
    })
    public ResponseEntity<MessageResponse> handleBadRequest(Exception exception, WebRequest request) {
        return buildResponse(HttpStatus.BAD_REQUEST,
                exception.getMessage() != null ? exception.getMessage() : "Bad request",
                exception);
    }

    @ExceptionHandler({
            AccessDeniedException.class,
            ForbiddenOperationException.class,
            EmailNotVerifiedException.class,
            UserDisabledException.class
    })
    public ResponseEntity<MessageResponse> handleForbidden(Exception exception, WebRequest request) {
        return buildResponse(HttpStatus.FORBIDDEN,
                exception.getMessage() != null ? exception.getMessage() : "Access is forbidden",
                exception);
    }

    @ExceptionHandler({
            UnauthenticatedException.class,
            InvalidTokenException.class
    })
    public ResponseEntity<MessageResponse> handleUnauthorized(Exception exception, WebRequest request) {
        return buildResponse(HttpStatus.UNAUTHORIZED,
                exception.getMessage() != null ? exception.getMessage() : "Authentication required",
                exception);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<MessageResponse> handleNotFound(ResourceNotFoundException exception, WebRequest request) {
        return buildResponse(HttpStatus.NOT_FOUND,
                exception.getMessage() != null ? exception.getMessage() : "Resource not found",
                exception);
    }

    @ExceptionHandler({
            ConflictException.class,
            UserAlreadyExistsException.class,
            PostNotEditableException.class
    })
    public ResponseEntity<MessageResponse> handleConflict(Exception exception, WebRequest request) {
        return buildResponse(HttpStatus.CONFLICT,
                exception.getMessage() != null ? exception.getMessage() : "Conflict with the current state",
                exception);
    }

    @ExceptionHandler(MethodNotAllowedException.class)
    public ResponseEntity<MessageResponse> handleMethodNotAllowed(MethodNotAllowedException exception, WebRequest request) {
        return buildResponse(HttpStatus.METHOD_NOT_ALLOWED,
                exception.getMessage() != null ? exception.getMessage() : "HTTP method not allowed",
                exception);
    }

    @ExceptionHandler(RateLimitExceededException.class)
    public ResponseEntity<MessageResponse> handleTooManyRequests(RateLimitExceededException exception, WebRequest request) {
        return buildResponse(HttpStatus.TOO_MANY_REQUESTS,
                exception.getMessage() != null ? exception.getMessage() : "Too many requests",
                exception);
    }

    @ExceptionHandler(TaskTimeoutException.class)
    public ResponseEntity<MessageResponse> handleRequestTimeout(TaskTimeoutException exception, WebRequest request) {
        return buildResponse(HttpStatus.REQUEST_TIMEOUT,
                exception.getMessage() != null ? exception.getMessage() : "Request timeout",
                exception);
    }

    @ExceptionHandler({
            DatabaseException.class,
            InternalServerException.class
    })
    public ResponseEntity<MessageResponse> handleServerError(Exception exception, WebRequest request) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR,
                exception.getMessage() != null ? exception.getMessage() : "Internal server error",
                exception);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<MessageResponse> handleAll(Exception exception, WebRequest request) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR,
                "An unexpected error occurred. Please try again later.",
                exception);
    }
}
