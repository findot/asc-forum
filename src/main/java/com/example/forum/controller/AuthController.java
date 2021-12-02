package com.example.forum.controller;

import com.example.forum.auth.JwtService;
import com.example.forum.auth.AuthUserDetails;
import com.example.forum.auth.RegistrationService;
import com.example.forum.controller.message.AccountRequest;
import com.example.forum.controller.message.AuthRequest;
import com.example.forum.controller.message.AuthResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController @RequestMapping(path = "/api/auth")
public class AuthController {
  
  private final AuthenticationManager authenticationManager;
  private final JwtService jwt;
  private final RegistrationService registration;

  public AuthController(
    AuthenticationManager authenticationManager,
    JwtService jwt,
    RegistrationService registration
  ) {
    this.authenticationManager = authenticationManager;
    this.jwt = jwt;
    this.registration = registration;
  }

  @PostMapping(path = "/login")
  public AuthResponse login(@RequestBody AuthRequest request) {
    Authentication auth = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        request.getUsername(),
        request.getPassword()
      )
    );

    AuthUserDetails user = (AuthUserDetails) auth.getPrincipal();;
    return new AuthResponse(jwt.create(user.getUsername(), false));
  }

  @PostMapping(path = "/register")
  public void register(@RequestBody AccountRequest accountData)
  { registration.register(accountData); }

}
