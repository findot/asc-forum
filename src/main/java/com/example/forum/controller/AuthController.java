package com.example.forum.controller;

import com.example.forum.auth.JwtService;
import com.example.forum.auth.AuthUserDetails;
import com.example.forum.auth.RegistrationService;
import com.example.forum.controller.message.AccountRequest;
import com.example.forum.controller.message.AuthRequest;
import com.example.forum.controller.message.AuthResponse;
import com.example.forum.model.account.Account;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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
  @ResponseStatus(HttpStatus.CREATED)
  public void register(@RequestBody AccountRequest accountData)
  { registration.register(accountData); }

  @GetMapping(path = "/refresh")
  public String refresh()
  {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    Account account = ((AuthUserDetails) auth.getPrincipal()).getAccount();
    return jwt.create(account.getUsername(), account.isAdmin());
  }

}
