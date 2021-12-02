package com.example.forum.auth;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;


@Service
public class JwtTokenFilter extends OncePerRequestFilter {
  
  private final JwtService jwt;
  
  private final UserDetailsService uds;

  public JwtTokenFilter(JwtService jwt, UserDetailsService uds) {
    this.jwt = jwt;
    this.uds = uds;
  }

  @Override
  protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain filterChain
  ) throws ServletException, IOException {
    
    String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

    if (authHeader == null || authHeader.isEmpty() || !authHeader.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }

    String tokenString = authHeader.split(" ")[1].trim();
    DecodedJWT token;
    try {
      token = jwt.decode(tokenString);
    } catch (JWTVerificationException e) {
      filterChain.doFilter(request, response);
      return;
    }

    String username = token.getSubject();
    UserDetails userDetails = uds.loadUserByUsername(username);
    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
      userDetails,
      null,
      userDetails == null ? List.of() : userDetails.getAuthorities()
    );

    auth.setDetails(
      new WebAuthenticationDetailsSource().buildDetails(request)
    );

    SecurityContextHolder.getContext().setAuthentication(auth);
    filterChain.doFilter(request, response);
  }

}
