package com.example.forum.controller.account;

public class AccountNotFoundException extends RuntimeException {
  
  private Long id;
  
  public AccountNotFoundException(Long id) {
    super(String.format("Account with id '%d' does not exist", id));
    this.id = id;
  }
  
  public Long getId()
  { return id; }

}
