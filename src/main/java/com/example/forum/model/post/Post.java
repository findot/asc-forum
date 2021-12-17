package com.example.forum.model.post;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.example.forum.model.account.Account;
import com.example.forum.model.comment.Comment;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
public class Post {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
  @JsonIdentityReference(alwaysAsId = true)
  private Account author;

  @OneToMany(
    mappedBy = "post",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
  @JsonIdentityReference(alwaysAsId = true)
  private List<Comment> comments;

  @Column()
  private Date published;

  @Column(length = 64, nullable = false)
  private String title;

  @Column(length = 4096, nullable = false)
  private String content;


  protected Post() {}

  public Post(Account author, String title, String content) {
    this.author = author;
    this.title = title;
    this.content = content;
    this.published = new Date();
  }

  @Override
  public String toString() {
    return String.format(
      "Post[id=%d, title=%s, published=%s]",
      this.id,
      this.title,
      this.published
    );
  }

  @Override
  public boolean equals(Object o) {
    if (o == this)
      return true;

    if (!(o instanceof Post))
      return false;
    
    Post that = (Post) o;
    return that.getId() == this.id;
  }
  
  public long getId()
  { return id; }

  public Date getPublished()
  { return published; }

  public String getTitle()
  { return title; }

  public String getContent()
  { return content; }

  public Account getAuthor()
  { return author; }

  public List<Comment> getComments()
  { return comments; }

  public void addComment(Comment comment)
  { comments.add(comment); }

}
