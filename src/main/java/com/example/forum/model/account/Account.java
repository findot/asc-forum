package com.example.forum.model.account;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.example.forum.model.comment.Comment;
import com.example.forum.model.post.Post;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
public class Account {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(unique=true, length = 64, nullable = false)
  private String username;

  @Column(unique=true, length=256, nullable = false)
  private String email;

  @JsonIgnore
  @Column(length = 256, nullable = false)
  private String password;

  @Column(nullable = false)
  private boolean closed;

  @Column(nullable = false)
  private boolean admin;

  @OneToMany(
    mappedBy = "author",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
  @JsonIdentityReference(alwaysAsId = true)
  private List<Post> posts;

  @OneToMany(
    mappedBy = "author",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
  @JsonIdentityReference(alwaysAsId = true)
  private List<Comment> comments;

  protected Account() {}

  public Account(String username, String email, String password)
  { this(username, email, password, false); }

  public Account(String username, String email, String password, boolean admin) {
    this.username = username;
    this.password = password;
    this.admin = admin;
    this.closed = false;
  }

  @Override
  public String toString() {
    return String.format(
      "Account[id=%d, username=%s, email=%s]",
      this.id,
      this.username,
      this.email
    );
  }

  public long getId()
  { return id; }

  public String getUsername()
  { return username; }

  public String getEmail()
  { return email; }

  public String getPassword()
  { return password; }

  public boolean isClosed()
  { return this.closed; }

  public boolean isAdmin()
  { return this.admin; }

  public List<Post> getPosts()
  { return posts; }

  public List<Comment> getComments()
  { return comments; }

}
