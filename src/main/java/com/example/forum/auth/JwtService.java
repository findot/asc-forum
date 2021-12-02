package com.example.forum.auth;

import com.auth0.jwt.interfaces.DecodedJWT;


public interface JwtService {
  
  public String create(String subject, boolean isAdmin);

  public DecodedJWT decode(String token);

}
