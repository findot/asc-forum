package com.example.forum.controller.message;

public class AccountRequest {
  
  private String username;

  private String password;

  public AccountRequest() {}

  public AccountRequest(String username, String password)
  { this.username = username; this.password = password; }

  public String getUsername()
  { return username; }

  public String getPassword()
  { return password; }
  
}
