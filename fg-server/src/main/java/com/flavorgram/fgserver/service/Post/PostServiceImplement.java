package com.flavorgram.fgserver.service.Post;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flavorgram.fgserver.exception.ResourceNotFoundException;
import com.flavorgram.fgserver.model.Post.Post;
import com.flavorgram.fgserver.repository.Post.PostRepository;

@Service
@Transactional
public class PostServiceImplement implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Post post) {
        Optional<Post> Flavorgram = this.postRepository.findById(post.getId());

        if (Flavorgram.isPresent()) {
            Post postUpdate = Flavorgram.get();
            postUpdate.setId(post.getId());
            postUpdate.setUserName(post.getUserName());
            postUpdate.setCaption(post.getCaption());
            postUpdate.setPostPath(post.getPostPath());
            postUpdate.setLikeCount(post.getLikeCount());
            postRepository.save(postUpdate);
            return postUpdate;
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + post.getId());
        }
    }

    @Override
    public List<Post> getAllPosts() {
        return this.postRepository.findAll();
    }

    @Override
    public Post getPostById(String postId) {

        Optional<Post> Flavorgram = this.postRepository.findById(postId);

        if (Flavorgram.isPresent()) {
            return Flavorgram.get();
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + postId);
        }
    }

    @Override
    public void deletePost(String postId) {
        Optional<Post> Flavorgram = this.postRepository.findById(postId);

        if (Flavorgram.isPresent()) {
            this.postRepository.delete(Flavorgram.get());
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + postId);
        }

    }
}