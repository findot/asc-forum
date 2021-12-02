package com.example.forum.controller;

public class UnauthorizedActionException extends RuntimeException {
  public UnauthorizedActionException()
  { super("Unauthorized action"); }
}
