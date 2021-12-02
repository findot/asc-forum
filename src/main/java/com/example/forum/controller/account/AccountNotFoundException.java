package com.example.forum.controller.account;

public class AccountNotFoundException extends RuntimeException {
  public AccountNotFoundException(Long id)
  { super(String.format("Account with id '%d' does not exist", id)); }
}
