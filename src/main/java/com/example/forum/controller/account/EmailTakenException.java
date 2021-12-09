package com.example.forum.controller.account;

public class EmailTakenException extends RuntimeException {

  public EmailTakenException(String email)
  { super(String.format("The email '%s' is already registered", email)); }

}
