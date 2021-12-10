package com.example.forum.controller.message;

import java.util.Map;

public class JsonError {
  
  private int code;
  private Map<String, String> reason;

  public JsonError(int code, Map<String, String> reason)
  { this.code = code; this.reason = reason; }

  public int getCode()
  { return code; }

  public Map<String, String> getReason()
  { return reason; }

}
