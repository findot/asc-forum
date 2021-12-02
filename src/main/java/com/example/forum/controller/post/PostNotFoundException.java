package com.example.forum.controller.post;

public class PostNotFoundException extends RuntimeException {

  public PostNotFoundException(Long id)
  { super(String.format("Post with id '%d' does not exist", id)); }

}
