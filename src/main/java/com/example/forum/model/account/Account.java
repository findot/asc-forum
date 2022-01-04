package com.example.forum.model.account;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.example.forum.model.comment.Comment;
import com.example.forum.model.post.Post;
import com.example.forum.model.report.Report;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "accounts")
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

  @OneToMany(
    mappedBy = "author",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
  @JsonIdentityReference(alwaysAsId = true)
  private List<Report> reports;

  protected Account() {}

  public Account(String username, String email, String password)
  { this(username, email, password, false); }

  public Account(String username, String email, String password, boolean admin) {
    this.username = username;
    this.email = email;
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

  @Override
  public boolean equals(Object o) {
    if (o == this)
      return true;

    if (!(o instanceof Account))
      return false;
    
    Account that = (Account) o;
    return that.getId() == this.id;
  }

  @Override
  public int hashCode() {
    // The username is marked as unique so its hashcode is sufficient for us
    return username.hashCode();
  }

  public long getId()
  { return id; }

  public String getUsername()
  { return username; }

  public String getEmail()
  { return email; }

  public String getPassword()
  { return password; }

  public void setPassword(String password)
  { this.password = password; }

  public boolean isClosed()
  { return this.closed; }

  public boolean isAdmin()
  { return this.admin; }

  public List<Post> getPosts()
  { return posts; }

  public List<Comment> getComments()
  { return comments; }

  public List<Report> getReports()
  { return reports; }

}
