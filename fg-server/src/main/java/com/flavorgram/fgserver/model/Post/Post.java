package com.flavorgram.fgserver.model.Post;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "posts")
public class Post {

    @Id
    private String id;

    // private UserData author;
    private String userName;
    private String caption;
    private String postPath;
    private int likeCount;

    public Post() {
        super();
    }

    public Post(String userName, String caption, String postPath,
            int likeCount) {
        this.id = UUID.randomUUID().toString();
        this.userName = userName;
        this.caption = caption;
        this.postPath = postPath;
        this.likeCount = likeCount;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getPostPath() {
        return postPath;
    }

    public void setPostPath(String postPath) {
        this.postPath = postPath;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

}
