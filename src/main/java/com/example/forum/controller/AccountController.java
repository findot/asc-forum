package com.example.forum.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.forum.controller.account.AccountNotFoundException;
import com.example.forum.auth.AuthUserDetails;
import com.example.forum.model.account.Account;
import com.example.forum.model.account.AccountRepository;
import com.example.forum.model.post.Post;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController @RequestMapping(path = "/api/accounts")
public class AccountController {
  
  private AccountRepository repository;

  public AccountController(AccountRepository repository)
  { this.repository = repository; }

  @GetMapping("")
  public List<Account> all() {
    List<Account> accounts = new ArrayList<Account>();
    for (Account account : repository.findAll())
      accounts.add(account);
    return accounts;
  }

  @GetMapping("{id}")
  public Account one(@PathVariable Long id) {
    Optional<Account> account = repository.findById(id);
    if (account.isPresent())
      return account.get();
    throw new AccountNotFoundException(id);
  }

  @GetMapping("self")
  public Account self() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    Account account = ((AuthUserDetails) auth.getPrincipal()).getAccount();
    return one(account.getId());
  }

  @GetMapping("{id}/posts")
  public List<Post> posts(@PathVariable Long id) {
    Optional<Account> account = repository.findById(id);
    if (account.isPresent())
      return account.get().getPosts();
    throw new AccountNotFoundException(id);
  }
  
}
