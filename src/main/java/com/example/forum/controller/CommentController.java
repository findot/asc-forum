package com.example.forum.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.forum.controller.comment.CommentNotFoundException;
import com.example.forum.model.comment.Comment;
import com.example.forum.model.comment.CommentRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController @RequestMapping(path = "/api/comments")
public class CommentController {

  private CommentRepository comments;

  public CommentController(CommentRepository comments)
  { this.comments = comments; }

  @GetMapping("")
  public List<Comment> all() {
    List<Comment> commentsReturned = new ArrayList<Comment>();
    for (Comment comment : comments.findAll())
      commentsReturned.add(comment);
    commentsReturned.sort((a, b) -> Long.compare(
      b.getPublished().getTime(),
      a.getPublished().getTime()
    ));
    return commentsReturned;
  }

  @GetMapping("{id}")
  public Comment one(@PathVariable Long id) {
    Optional<Comment> comment = comments.findById(id);
    if (comment.isPresent())
      return comment.get();
    else
      throw new CommentNotFoundException(id);
  }
  
}
