package com.example.forum.controller.account;

import com.example.forum.controller.message.JsonError;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class AccountAdvice {
  
  @ResponseBody
  @ExceptionHandler(PseudoTakenException.class)
  @ResponseStatus(HttpStatus.CONFLICT)
  JsonError pseudoTakenHandler(PseudoTakenException ex) {
    return new JsonError(409, ex.getMessage());
  }

  @ResponseBody
  @ExceptionHandler(EmailTakenException.class)
  @ResponseStatus(HttpStatus.CONFLICT)
  JsonError emailTakenHandler(PseudoTakenException ex) {
    return new JsonError(409, ex.getMessage());
  }

  @ResponseBody
  @ExceptionHandler(AccountNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  JsonError pseudoTakenHandler(AccountNotFoundException ex) {
    return new JsonError(404, ex.getMessage());
  }

}
