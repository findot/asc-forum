package com.example.forum.controller.message;

public class PostRequest {

  private String title;
  
  private String content;

  public PostRequest() {}

  public PostRequest(String title, String content)
  { this.title = title; this.content = content; }

  public String getTitle()
  { return title; }

  public String getContent()
  { return content; }

}