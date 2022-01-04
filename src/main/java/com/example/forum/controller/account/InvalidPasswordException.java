package com.example.forum.controller.account;

public class InvalidPasswordException extends RuntimeException {
  
  public InvalidPasswordException() {
    super("Invalid password");
  }

}
