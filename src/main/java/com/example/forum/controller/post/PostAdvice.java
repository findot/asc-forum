package com.example.forum.controller.post;

import java.util.HashMap;

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
  JsonError postNotFoundHandler(PostNotFoundException ex) {
    HashMap<String, String> reason = new HashMap<String, String>();
    reason.put("notFound", ex.getId().toString());
    return new JsonError(404, reason);
  }

}
