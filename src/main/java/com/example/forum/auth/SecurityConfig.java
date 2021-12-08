package com.example.forum.auth;

import javax.servlet.http.HttpServletResponse;

import com.example.forum.model.account.AccountRepository;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@EnableWebSecurity
@EnableGlobalMethodSecurity(
  securedEnabled = true,
  jsr250Enabled = true,
  prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  
  private final AccountRepository accounts;

  private final JwtTokenFilter jwtTokenFilter;

  public SecurityConfig(
    AccountRepository accounts,
    JwtTokenFilter jwtTokenFilter
  ) {
    this.accounts = accounts;
    this.jwtTokenFilter = jwtTokenFilter;
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(username ->
      accounts
        .findByUsername(username)
        .map(account-> new AuthUserDetails(account))
        .orElseThrow(
          () -> new UsernameNotFoundException(username)
        )
    );
  }
  
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http = http.cors().and().csrf().disable();

    http = http
      .sessionManagement()
      .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and();

    http = http.exceptionHandling().authenticationEntryPoint(
      (request, response, ex) -> {
        response.sendError(
          HttpServletResponse.SC_UNAUTHORIZED,
          ex.getMessage()
        );
      }
    ).and();

    http.authorizeRequests()
      .antMatchers("/api/auth/login", "/api/auth/logout", "/api/auth/register").permitAll()
      .antMatchers("/api/**").authenticated()
      .antMatchers("/**").permitAll();

    http.addFilterBefore(
      jwtTokenFilter,
      UsernamePasswordAuthenticationFilter.class
    );
  }

  @Bean
  public PasswordEncoder passwordEncoder()
  { return new BCryptPasswordEncoder(); }

  @Override @Bean
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManager();
  }

}
