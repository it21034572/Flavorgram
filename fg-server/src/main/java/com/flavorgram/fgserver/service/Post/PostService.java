package com.flavorgram.fgserver.service.Post;

import java.util.List;

import org.springframework.stereotype.Service;

import com.flavorgram.fgserver.model.Post.Post;

@Service
public interface PostService {

    Post createPost(Post post);

    Post updatePost(Post post);

    List<Post> getAllPosts();

    Post getPostById(String postId);

    void deletePost(String Id);
}
