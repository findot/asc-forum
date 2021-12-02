package com.example.forum.auth;

import java.util.Optional;

import com.example.forum.model.account.Account;
import com.example.forum.model.account.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthUserDetailsService implements UserDetailsService {
  
  @Autowired
  private AccountRepository accounts;

  @Override
  public UserDetails loadUserByUsername(String username) {
    Optional<Account> account = accounts.findByUsername(username);
    if (!account.isPresent())
      throw new UsernameNotFoundException(username);
    return new AuthUserDetails(account.get());
  }

}
