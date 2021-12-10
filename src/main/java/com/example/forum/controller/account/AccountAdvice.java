package com.example.forum.controller.account;

import java.util.HashMap;

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
    HashMap<String, String> reason = new HashMap<String, String>();
    reason.put("username", "reserved");
    return new JsonError(409, reason);
  }

  @ResponseBody
  @ExceptionHandler(EmailTakenException.class)
  @ResponseStatus(HttpStatus.CONFLICT)
  JsonError emailTakenHandler(EmailTakenException ex) {
    HashMap<String, String> reason = new HashMap<String, String>();
    reason.put("email", "reserved");
    return new JsonError(409, reason);
  }

  @ResponseBody
  @ExceptionHandler(AccountNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  JsonError accountNotFoundHandler(AccountNotFoundException ex) {
    HashMap<String, String> reason = new HashMap<String, String>();
    reason.put("notFound", ex.getId().toString());
    return new JsonError(404, reason);
  }

}
