package com.example.forum.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.forum.auth.AuthUserDetails;
import com.example.forum.model.account.Account;
import com.example.forum.model.comment.Comment;
import com.example.forum.model.comment.CommentRepository;
import com.example.forum.model.post.Post;
import com.example.forum.model.post.PostRepository;
import com.example.forum.model.report.Report;
import com.example.forum.model.report.ReportRepository;
import com.example.forum.controller.comment.CommentNotFoundException;
import com.example.forum.controller.message.CommentRequest;
import com.example.forum.controller.message.PostRequest;
import com.example.forum.controller.message.ReportRequest;
import com.example.forum.controller.post.PostNotFoundException;


@RestController @RequestMapping(path = "/api/posts")
public class PostController {
  
  private PostRepository posts;
  private CommentRepository comments;
  private ReportRepository reports;

  public PostController(
    PostRepository posts,
    CommentRepository comments,
    ReportRepository reports
  ) {
    this.posts = posts;
    this.comments = comments;
    this.reports = reports;
  }

  @GetMapping("")
  public List<Post> all() {
    List<Post> postsReturned = new ArrayList<Post>();
    for (Post post : posts.findAll())
      postsReturned.add(post);
    postsReturned.sort((a, b) -> Long.compare(
      b.getPublished().getTime(),
      a.getPublished().getTime()
    ));
    return postsReturned;
  }

  @PostMapping("")
  @ResponseStatus(code = HttpStatus.CREATED)
  public Post create(@RequestBody PostRequest newPost) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    Account account = ((AuthUserDetails) auth.getPrincipal()).getAccount();
    
    Post post = new Post(account, newPost.getTitle(), newPost.getContent());
    posts.save(post);
    
    return post;
  }


  @GetMapping("{id}")
  public Post one(@PathVariable Long id) {
    Optional<Post> post = posts.findById(id);
    if (post.isPresent())
      return post.get();
    else
      throw new PostNotFoundException(id);
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable Long id) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    Account account = ((AuthUserDetails) auth.getPrincipal()).getAccount();

    Optional<Post> post = posts.findById(id);
    if (!post.isPresent())
      throw new PostNotFoundException(id);

    if (!account.isAdmin() && !post.get().getAuthor().equals(account))
      throw new UnauthorizedActionException();
    
    posts.delete(post.get());
  }

  @PostMapping("{id}/highlight")
  public Post highlight(@PathVariable Long id) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    Account account = ((AuthUserDetails) auth.getPrincipal()).getAccount();

    if (!account.isAdmin())
      throw new UnauthorizedActionException();
    
    Optional<Post> highlightedPost = posts.findById(id);
    if (!highlightedPost.isPresent())
      throw new PostNotFoundException(id);
    
    Post post = highlightedPost.get();
    post.setHighlighted(!post.getHighlighted());
    
    return posts.save(post);
  }

  @PostMapping("{id}/report")
  public Report report(
    @PathVariable Long id,
    @RequestBody ReportRequest newReport
  ) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    Account account = ((AuthUserDetails) auth.getPrincipal()).getAccount();
    
    Optional<Post> post = posts.findById(id);
    if (!post.isPresent())
      throw new PostNotFoundException(id);

    Report report = new Report(
      account,
      post.get(),
      newReport.getReason()
    );

    return reports.save(report);
  }


  @GetMapping("{id}/comments")
  public List<Comment> allComments(@PathVariable Long id) {
    Optional<Post> post = posts.findById(id);
    if (post.isPresent())
      return post.get().getComments();
    else
      throw new PostNotFoundException(id);
  }

  @PostMapping("{id}/comments")
  @ResponseStatus(code = HttpStatus.CREATED)
  public Comment createComment(
    @PathVariable Long id,
    @RequestBody CommentRequest newComment
  ) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    Account account = ((AuthUserDetails) auth.getPrincipal()).getAccount();
    
    Optional<Post> post = posts.findById(id);
    if (!post.isPresent())
      throw new PostNotFoundException(id);
    
    Comment comment = new Comment(
      account,
      post.get(),
      newComment.getContent()
    );
    
    return comments.save(comment);
  }

  
  @DeleteMapping("{postId}/comments/{commentId}")
  public void deleteComment(@PathVariable Long postId, @PathVariable Long commentId) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    Account account = ((AuthUserDetails) auth.getPrincipal()).getAccount();

    Optional<Post> post = posts.findById(postId);
    if (!post.isPresent())
      throw new PostNotFoundException(postId);

    Optional<Comment> comment = comments.findById(commentId);
    if (!comment.isPresent())
      throw new CommentNotFoundException(postId, commentId);

    if (comment.get().getAuthor() != account)
      throw new UnauthorizedActionException();

    comments.delete(comment.get());
  }

  @GetMapping("search")
  public List<Post> search(@RequestParam String title)
  { return posts.findByTitleContaining(title); }

}
