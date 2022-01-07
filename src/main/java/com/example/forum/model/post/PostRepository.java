package com.example.forum.model.post;

import java.util.List;

import org.springframework.data.repository.CrudRepository;


public interface PostRepository extends CrudRepository<Post, Long> {
  
  List<Post> findByTitleContaining(String title);

}
