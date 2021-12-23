package com.example.forum.model.report;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import com.example.forum.model.account.Account;
import com.example.forum.model.post.Post;


@Entity
@Table(name = "reports")
public class Report {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
  @JsonIdentityReference(alwaysAsId = true)
  private Account author;

  @ManyToOne(fetch = FetchType.LAZY)
  @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
  @JsonIdentityReference(alwaysAsId = true)
  private Post reported;

  @Column(nullable = false)
  private Date published;

  @Column(length = 4096, nullable = false)
  private String content;

  protected Report() {}

  public Report(Account author, Post reported, String content) {
    this.author = author;
    this.reported = reported;
    this.content = content;
    this.published = new Date();
  }

  @Override
  public String toString() {
    return String.format(
      "Report[id=%d, author=%d, post=%d, published=%s]",
      this.id,
      this.author.getId(),
      this.reported.getId(),
      this.published
    );
  }

  @Override
  public boolean equals(Object o) {
    if (o == this)
      return true;

    if (!(o instanceof Report))
      return false;
    
    Report that = (Report) o;
    return that.getId() == this.id;
  }

  public long getId()
  { return id; }

  public Account getAuthor()
  { return author; }

  public Post getReported()
  { return reported; }

  public Date getPublished()
  { return published; }

  public String getContent()
  { return content; }
  
}
