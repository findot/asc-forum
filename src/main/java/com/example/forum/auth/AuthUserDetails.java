package com.example.forum.auth;

import java.util.Collection;
import java.util.List;

import com.example.forum.model.account.Account;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class AuthUserDetails implements UserDetails {

  private Account account;
  
  public AuthUserDetails(Account account)
  { this.account = account; }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities()
  { return List.of(); }

  @Override
  public String getPassword()
  { return account.getPassword(); }

  @Override
  public String getUsername()
  { return account.getUsername(); }

  @Override
  public boolean isAccountNonExpired()
  { return !account.isClosed(); }

  @Override
  public boolean isAccountNonLocked()
  { return !account.isClosed(); }

  @Override
  public boolean isCredentialsNonExpired()
  { return !account.isClosed(); }

  @Override
  public boolean isEnabled()
  { return !account.isClosed(); }
  
  public Account getAccount()
  { return account; }
}
