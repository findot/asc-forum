package com.example.forum;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.forum.model.account.Account;
import com.example.forum.model.account.AccountRepository;


@Component
public class ApplicationReadyListener implements ApplicationListener<ApplicationReadyEvent> {

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  private Logger logger = LoggerFactory.getLogger(ApplicationListener.class);;

  @Override
  public void onApplicationEvent(ApplicationReadyEvent event) {
    Optional<Account> prevAdminAccount = accountRepository.findByUsername("admin");
    if (prevAdminAccount.isPresent()) return;

    String password = this.generatePassword();
    String encodedPassword = this.passwordEncoder.encode(password);
    Account newAccount = new Account("admin", "admin@ascforum.be", encodedPassword, true);
    
    this.accountRepository.save(newAccount);
    this.logger.info("Admin account created with password :'" + password + "'.");
  }

  private String generatePassword() {
    CharacterRule alphabets = new CharacterRule(EnglishCharacterData.Alphabetical);
    CharacterRule digits    = new CharacterRule(EnglishCharacterData.Digit);
    CharacterRule specials  = new CharacterRule(EnglishCharacterData.Special);
    PasswordGenerator gen   = new PasswordGenerator();
    return gen.generatePassword(16, alphabets, digits, specials);
  }
  
}
