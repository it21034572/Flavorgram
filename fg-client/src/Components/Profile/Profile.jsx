import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Post from "../Posts/Post";
import ProfileHeader from "./ProfileHeader";
import axios from "axios";
import { useAuth } from "../Authentication/auth";
import Cookies from "universal-cookie";
import { Avatar, Dialog } from "@material-ui/core";

const Profile = (props) => {
  const cookies = new Cookies();
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});
  // const [_id, setUser_id] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [profilePic, setProfilePic] = useState();
  // const [bio, setBio] = useState("");

  // const [state, setState] = useState(false);

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
  }, [modal]);

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
          <ProfileHeader setModal={setModal} modal={modal} />
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
                      <h2 className="font- text-xl">
                        Username : {user.username}
                      </h2>
                      <h2 className="font- text-xl">
                        Name : {user.firstName + " " + user.lastName}
                      </h2>
                      <h2 className="font- text-xl">Bio : {user.bio}</h2>
                    </div>
                  </div>
                  {/* // END INTRO */}
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
