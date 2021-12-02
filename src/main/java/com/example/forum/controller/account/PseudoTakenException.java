package com.example.forum.controller.account;

public class PseudoTakenException extends RuntimeException {

  public PseudoTakenException(String pseudo)
  { super(String.format("The pseudo '%s' is not available", pseudo)); }

}
