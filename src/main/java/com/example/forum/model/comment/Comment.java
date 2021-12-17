package com.example.forum.model.comment;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.forum.model.account.Account;
import com.example.forum.model.post.Post;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "comments")
public class Comment {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
  @JsonIdentityReference(alwaysAsId = true)
  private Post post;

  @ManyToOne(fetch = FetchType.LAZY)
  @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
  @JsonIdentityReference(alwaysAsId = true)
  private Account author;

  @Column(length = 512, nullable = false)
  private String content;

  @Column(nullable = false)
  private Date published;


  protected Comment() {}

  public Comment(Account author, Post post, String content) {
    this.author = author;
    this.post = post;
    this.content = content;
    this.published = new Date();
  }

  @Override
  public String toString() {
    return String.format(
      "Comment[id=%d, post=%d, published=%s]",
      this.id,
      this.post.getId(),
      this.published
    );
  }

  @Override
  public boolean equals(Object o) {
    if (o == this)
      return true;

    if (!(o instanceof Comment))
      return false;
    
    Comment that = (Comment) o;
    return that.getId() == this.id;
  }

  public long getId()
  { return id; }

  public Date getPublished()
  { return published; }

  public String getContent()
  { return content; }

  public Account getAuthor()
  { return author; }

  public Post getPost()
  { return post; }

}
