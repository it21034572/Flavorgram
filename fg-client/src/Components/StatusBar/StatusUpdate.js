import { Avatar } from "@material-ui/core";
import "./StatusBar.css";
import statusimg from "../../images/pp1.png";
import paperClip from "../../images/paperclip.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Authentication/auth";
import Cookies from "universal-cookie";
import { Link, useParams, useNavigate } from "react-router-dom";
import {  Dialog } from "@material-ui/core";


function StatusUpdate() {
  const cookies = new Cookies();

  const [status, setStatus] = useState("");
  const [status_id, setStatus_id] = useState("");
  var [user_id, setUser_id] = useState("");
  const [statusPath, setStatusPath] = useState("");
  const [caption, setCaption] = useState("");
  var [timestamp, setTimestamp] = useState("");

  var currentDate = new Date().toISOString();

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

  const getStatus = async () => {
    //getStatus is the function to get the data from the backend
    await axios.get("http://localhost:8081/status/" + id , options).then((res) => {
      setStatus(res.data);  
      setStatus_id(res.data.status_id);
      setUser_id(res.data.user_id);
      setStatusPath(res.data.statusPath);
      setCaption(res.data.caption);
      setTimestamp(res.data.timestamp);

      console.log("Status: " + status.status_id);

  }).catch((err) => {
      alert(err);
  })
  };

  useEffect(() => {
    //useEffect is used to call the function getStock
    getStatus();
  }, [id]);

  const deleteStatus = async (id) => {
    await axios
      .delete("http://localhost:8081/status/" + id, options)
      .then(() => {
        getStatus();
        navigate("/home");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  
  const updateStatus = async (id) => {

        const newStatus = {
          // status_id:"12345",
          user_id: { id: localStorage.getItem("user_id").toString() },
          statusPath,
          caption,
          timestamp,
        };
        // console.log(newStatus);
        await axios
          .put("http://localhost:8081/status/" + id, newStatus, options)
          .then(() => {
             getStatus();
            // setState(!state);
            // setShow(false);
            navigate("/home");
          })
          .catch((err) => {
            console.log(err);
          });

  };

  const goBack = () => {
    navigate('/home');
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
          onClick={() => updateStatus(id)}
        />
        </div>
      </Dialog>
    </div>
  );
  }

export default StatusUpdate;