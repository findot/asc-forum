package com.example.forum.controller.message;

public class CommentRequest {
  
  private String content;

  public CommentRequest() {}

  public CommentRequest(String content)
  { this.content = content; }

  public String getContent()
  { return content; }

}
