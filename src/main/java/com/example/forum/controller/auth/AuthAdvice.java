package com.example.forum.controller.auth;

import com.example.forum.controller.message.JsonError;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;


@ControllerAdvice
public class AuthAdvice {
  
  @ResponseBody
  @ExceptionHandler(BadCredentialsException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  JsonError badCredentialsHandler(BadCredentialsException ex) {
    return new JsonError(401, null);
  }

}
