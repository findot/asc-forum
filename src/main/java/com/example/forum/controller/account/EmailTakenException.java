package com.example.forum.controller.account;

public class EmailTakenException extends RuntimeException {

  private String email;

  public EmailTakenException(String email)
  {
    super(String.format("The email '%s' is already registered", email));
    this.email = email;
  }

  public String getEmail()
  { return email; }

}
