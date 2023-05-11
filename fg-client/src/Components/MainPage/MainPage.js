import React, { Component } from "react";
import "./MainPage.css";
import Post from "../Posts/Post";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postArray: [],
    };
  }

  componentDidMount() {
    this.getPost();
  }

  getPost = () => {
    //API
    let data = [
      {
        postId: "1234",
        userName: "thrinith.shevon",
        postImageURL:
          "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574",
        timeStamp: "12345",
        likes: "1234",
      },
      {
        postId: "4567",
        userName: "hiroshan",
        postImageURL:
          "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg",
        timeStamp: "12345",
        likes: "2399",
      },
      {
        postId: "5634",
        userName: "shafa",
        postImageURL:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80",
        timeStamp: "12345",
        likes: "2000",
      },
      {
        postId: "6738",
        userName: "sarah",
        postImageURL:
          "https://www.teenaagnel.com/wp-content/uploads/2019/12/food-photography-in-dubai.jpg",
        timeStamp: "12345",
        likes: "1289",
      },
    ];
    this.setState({ postArray: data });
  };

  render() {
    return (
      <div>
        {this.state.postArray.map((item, index) => (
          <Post
            id={item.postId}
            userName={item.userName}
            postImage={item.postImageURL}
            likes={item.likes}
          />
        ))}
      </div>
    );
  }
}

export default MainPage;
