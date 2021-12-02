package com.example.forum.controller.post;

import com.example.forum.controller.message.JsonError;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class PostAdvice {

  @ResponseBody
  @ExceptionHandler(PostNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  JsonError pseudoTakenHandler(PostNotFoundException ex) {
    return new JsonError(404, ex.getMessage());
  }

}
