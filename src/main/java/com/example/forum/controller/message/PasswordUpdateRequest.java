package com.example.forum.controller.message;

public class PasswordUpdateRequest {
    
  private String oldPassword;

  private String newPassword;

  public PasswordUpdateRequest() {}

  public PasswordUpdateRequest(String oldPassword, String newPassword)
  { this.oldPassword = oldPassword; this.newPassword = newPassword; }

  public String getOldPassword()
  { return oldPassword; }

  public String getNewdPassword()
  { return newPassword; }

}
