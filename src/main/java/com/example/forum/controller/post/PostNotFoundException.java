package com.example.forum.controller.post;

public class PostNotFoundException extends RuntimeException {

  private Long id;

  public PostNotFoundException(Long id) {
    super(String.format("Post with id '%d' does not exist", id));
    this.id = id;
  }

  public Long getId()
  { return id; }
  
}
