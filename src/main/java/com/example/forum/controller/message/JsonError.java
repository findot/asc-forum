package com.example.forum.controller.message;

public class JsonError {
  
  private int code;
  private String reason;

  public JsonError(int code, String reason)
  { this.code = code; this.reason = reason; }

  public int getCode()
  { return code; }

  public String getReason()
  { return reason; }

}
