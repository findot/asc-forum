package com.example.forum.auth;

import com.example.forum.controller.account.PseudoTakenException;
import com.example.forum.controller.message.AccountRequest;
import com.example.forum.model.account.Account;
import com.example.forum.model.account.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {
  
  @Autowired
  private AccountRepository accounts;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public boolean checkIfUserExist(String username) {
    return accounts.findByUsername(username).isPresent();
  }

  public void register(AccountRequest accountRequest) throws PseudoTakenException {
    if (checkIfUserExist(accountRequest.getUsername()))
      throw new PseudoTakenException(accountRequest.getUsername());
    
    String encodedPassword = passwordEncoder.encode(accountRequest.getPassword()); 
    Account account = new Account(accountRequest.getUsername(), encodedPassword);
    
    accounts.save(account);
  }
  
}
