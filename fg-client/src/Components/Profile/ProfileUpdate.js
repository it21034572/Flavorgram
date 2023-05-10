import { Avatar } from "@material-ui/core";
import statusimg from "../../images/pp1.png";
import paperClip from "../../images/paperclip.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Authentication/auth";
import Cookies from "universal-cookie";
import { Link, useParams, useNavigate } from "react-router-dom";
import {  Dialog } from "@material-ui/core";


function ProfileUpdate() {
  const cookies = new Cookies();

  const [users,setUsers] = useState({});
  const [_id, setUser_id] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [bio, setBio] = useState("");


  const navigate = useNavigate();

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

  const {id} = useParams();
  console.log(id);

  const getUsers = async () => {
    //getStatus is the function to get the data from the backend
    await axios.get("http://localhost:8081/api/users/" + id , options).then((res) => {
      setUsers(res.data);  
      setUser_id(res.data._id);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setEmail(res.data.email);
      setBio(res.data.bio);

      console.log("Profile: " + status.status_id);

  }).catch((err) => {
      alert(err);
  })
  };

  useEffect(() => {
    //useEffect is used to call the function getStock
    getUsers();
  }, [id]);

  const deleteUsers = async (id) => {
    await axios
      .delete("http://localhost:8081/api/users" + id, options)
      .then(() => {
        getUsers();
        navigate("/profile");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  
  const UpdateUser = async (id) => {

        const newUser = {
          _id: { id: localStorage.getItem("user_id").toString() },
          firstName,
          lastName,
          email,
          bio,
        };
        // console.log(newUser);
        await axios
          .put("http://localhost:8081/api/users/" + id, newUser, options)
          .then(() => {
             getUsers();
            // setState(!state);
            // setShow(false);
            navigate("/profile");
          })
          .catch((err) => {
            console.log(err);
          });

  };

  const goBack = () => {
    navigate('/profile');
  }

  return (
    <div >
      <Dialog open={true}
        classname="upload_dialogbox"
        aria-labelledby="simple-dialog-title"
      >
       <div className="upload_header">{user_id.username}</div>
        <button onClick={() => goBack()}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRQeV7P3xoHW_Yc4bNp0B5kXCOmuSbxdck1Q&usqp=CAU"
        style={{width:"40px", height:"40px", position:"absolute", top:"20px", right:"40px"}}
        /></button>

        
        <img src={statusPath} className="upload_preview" />

        <input
          type="text"
          className="upload_textbox"        
          value = {caption} onChange={(e) => setCaption(e.target.value)}
        />

        <div style={{display:"inline-block", textAlign:"center", margin:"10px"}}>
        <input
          type="button"
          value="Edit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 ml-2 rounded-full"
          onClick={() => UpdateUser(id)}
        />
        </div>
      </Dialog>
    </div>
  );
  }

export default ProfileUpdate;
