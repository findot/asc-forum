package com.example.forum.auth;

import com.example.forum.controller.account.EmailTakenException;
import com.example.forum.controller.account.InvalidPasswordException;
import com.example.forum.controller.account.PseudoTakenException;
import com.example.forum.controller.message.AccountRequest;
import com.example.forum.model.account.Account;
import com.example.forum.model.account.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;


@Service
public class RegistrationService {
  
  @Autowired
  private AccountRepository accounts;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public boolean checkIfUserExist(String username)
  { return accounts.findByUsername(username).isPresent(); }

  public boolean checkIfEmailIsRegistered(String email)
  { return accounts.findByEmail(email).isPresent(); }

  public void register(AccountRequest accountRequest)
    throws PseudoTakenException, EmailTakenException
  {
    validate(accountRequest);     

    String encodedPassword = passwordEncoder.encode(accountRequest.getPassword()); 
    Account account = new Account(
      accountRequest.getUsername(),
      accountRequest.getEmail(),  
      encodedPassword
    );
    
    accounts.save(account);
  }
  
  public void validate(AccountRequest accountRequest)
    throws PseudoTakenException, EmailTakenException
  {
    if (checkIfUserExist(accountRequest.getUsername()))
      throw new PseudoTakenException(accountRequest.getUsername());
    
    if (checkIfEmailIsRegistered(accountRequest.getEmail()))
      throw new EmailTakenException(accountRequest.getEmail());
  
    validatePassword(accountRequest.getPassword());
  }

  public void validatePassword(String password) {
    // TODO
  }

  public Account updatePassword(Account account, String oldPassword, String newPassword)
  {
    var authentication = new UsernamePasswordAuthenticationToken(
      account.getUsername(),
      oldPassword
    );
    // Verify the old password
    if (!authentication.isAuthenticated())
      throw new InvalidPasswordException();
    
    validatePassword(newPassword);

    String newPass = passwordEncoder.encode(newPassword);
    account.setPassword(newPass);
    return accounts.save(account);
  }

}
