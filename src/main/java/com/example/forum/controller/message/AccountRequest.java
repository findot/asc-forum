package com.example.forum.controller.message;

public class AccountRequest {
  
  private String username;

  private String email;

  private String password;

  public AccountRequest() {}

  public AccountRequest(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public String getUsername()
  { return username; }

  public String getPassword()
  { return password; }
  
  public String getEmail()
  { return email; }

}
