package com.example.forum.controller.comment;

public class CommentNotFoundException extends RuntimeException {
  
  public CommentNotFoundException(Long commentId)
  { super(String.format("Comment '%d' does not exist", commentId)); }

  public CommentNotFoundException(Long postId, Long commentId)
  { super(String.format("Comment '%d' for post '%d' does not exist", commentId, postId)); }

}
