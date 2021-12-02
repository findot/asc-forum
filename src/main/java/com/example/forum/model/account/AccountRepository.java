package com.example.forum.model.account;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;


public interface AccountRepository extends CrudRepository<Account, Long> {

  public Optional<Account> findByUsername(String username);

}
