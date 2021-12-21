package com.example.forum.controller.message;

public class ReportRequest {

  private String reason;

  public ReportRequest() {}

  public ReportRequest(String reason)
  { this.reason = reason; }

  public String getReason()
  { return this.reason; }

}