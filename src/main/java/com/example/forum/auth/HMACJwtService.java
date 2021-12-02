package com.example.forum.auth;

import java.util.Calendar;
import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class HMACJwtService implements JwtService {
  
  private String issuer;

  private int lifespan;

  private Algorithm algorithm;

  private JWTVerifier verifier;


  public HMACJwtService(
    @Value("${jwt.secret}") String secret,
    @Value("${jwt.issuer}") String issuer,
    @Value("${jwt.lifespan}") Integer lifespan
  ) {
    this.issuer = issuer;
    this.lifespan = lifespan;
    this.algorithm = Algorithm.HMAC512(secret);
    this.verifier = JWT.require(algorithm)
      .withIssuer(issuer)
      .build();
  }

  @Override
  public String create(String subject, boolean isAdmin) {
    Calendar calendar = Calendar.getInstance();
    Date now = calendar.getTime();
    
    calendar.add(Calendar.MINUTE, lifespan);
    Date then = calendar.getTime();
    
    return JWT.create()
      .withIssuer(issuer)
      .withSubject(subject)
      .withIssuedAt(now)
      .withNotBefore(now)
      .withExpiresAt(then)
      .withClaim("isAdmin", isAdmin)
      .sign(algorithm);
  }

  @Override
  public DecodedJWT decode(String token) throws JWTVerificationException
  { return verifier.verify(token); }

}
