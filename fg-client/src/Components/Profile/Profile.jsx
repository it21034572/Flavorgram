import React, { Component, useEffect, useState } from "react";
//import "./Profile.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Post from "../Posts/Post";
// import RightBar from "../RightBar/RightBar";
// import FollowUnfollowBtn  from "./followUnfollowbtn";
// import EditProfileBtn from "./editProfilebtn";
// import CreatePostBtn from "./createPostbtn";
import ProfileHeader from "./ProfileHeader";
import axios from "axios";
import { useAuth } from "../Authentication/auth";
import Cookies from "universal-cookie";
import { Avatar, Dialog } from "@material-ui/core";

const Profile = (props) => {
  //Status is the state variable and setStatus
  //is the function to update the state variable
  const cookies = new Cookies();
  const [user, setUser] = useState({});
  const [_id, setUser_id] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [bio, setBio] = useState("");

  const [state, setState] = useState(false);

  // useEffect(()=>{
  //     console.log()
  // })

  const auth = useAuth();
  let options = {};

  if (!auth.social) {
    options = {
      headers: {
        Authorization: "Bearer " + cookies.get("token"),
        "Content-type": "application/json",
      },
    };
  } else {
    options = {
      withCredentials: true,
    };
  }

  useEffect(() => {
    async function getUserDetails() {
      await getUser();
    }
    getUserDetails();
  }, []);

  async function getUser() {
    await axios
      .get("http://localhost:8081/api/users/" + auth.user.user_id, options)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <div>
      <NavBar />
      <div className="h-screen">
        <div className="mt-14 shadow bg-white h-screen">
          {/* PROFILE HEADER */}
          <ProfileHeader />
          {/* END PROFILE HEADER */}

          {/* // CONTENT */}
          <div>
            <div className="bg-gray-100 ">
              <div className="flex justify-center h-screen">
                {/* LEFT */}
                <div>
                  {/* // INTRO */}
                  <div className="mr-12 mt-4">
                    <div
                      className="p-4 shadow rounded-lg bg-white w-80"
                      id="intro"
                    >
                      <h1 className="font-bold text-xl">Bio</h1>
                      <h2 className="font- text-xl">Email : {user.email}</h2>
                      <h2 className="font- text-xl">Name : {user.firstName}</h2>
                      <h2 className="font- text-xl">Bio : {user.bio}</h2>
                    </div>
                  </div>
                  {/* // END INTRO */}

                  {/* // PHOTOS */}
                  <div className="mr-12 mt-4">
                    <div
                      className="p-4 shadow rounded-lg bg-white w-80"
                      id="intro"
                    >
                      <div className="flex justify-between">
                        <h1 className="font-bold text-xl">Photos</h1>
                        <a href="#" className="text-lg text-blue-700">
                          See All Photos
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* // END PHOTOS */}

                  {/* // FRIENDS */}
                  <div className="mr-12 mt-4">
                    <div
                      className="p-4 shadow rounded-lg bg-white w-80"
                      id="intro"
                    >
                      {/* Header */}
                      <div className="flex justify-between">
                        <h1 className="font-bold text-xl">Friends</h1>
                        <Link
                          to="/friends/myId"
                          className="text-lg text-blue-700 hover:bg-blue-200"
                        >
                          See All Friends
                        </Link>
                      </div>
                      {/* List */}
                      <div className="">
                        <p className="text-base text-gray-400">1000 friends</p>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="bg-white p-0.5">
                            <img
                              src="https://i.insider.com/5c8936d026c84b24b711d224?width=700"
                              className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                            />
                            <Link
                              to={`/profile/friendId`}
                              className="font-semibold text-sm"
                            >
                              Friend FullName
                            </Link>
                          </div>
                          <div className="bg-white p-0.5">
                            <img
                              src="https://i.insider.com/5c8936d026c84b24b711d224?width=700"
                              className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                            />
                            <Link
                              to={`/profile/friendId`}
                              className="font-semibold text-sm"
                            >
                              Friend FullName
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* // END FRIENDS */}
                </div>
                {/* END LEFT */}

                {/* // POST LIST */}
                <div className="w-2/5">
                  {/* CREATE POST */}

                  {/* END CREATE POST */}

                  {/* POST */}
                  <Post />
                  {/* END POST */}
                </div>
                {/* // END POST LIST */}
              </div>
            </div>
          </div>
          {/* // END CONTENT */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
