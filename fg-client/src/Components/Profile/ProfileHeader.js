import React, { useState, useEffect } from "react"
import { Modal, ModalBody, ModalHeader, Row , Col} from "reactstrap";
import axios from "axios";
import { useAuth } from "../Authentication/auth";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export const ProfileHeader = () =>{

    const cookies = new Cookies();
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [user, setUser] = useState({});
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [bio, setBio]= useState("");


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
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setUserName(res.data.username);
            setBio(res.data.bio);

            console.log("Profile: " + auth.user.user_id);
        })
        .catch((err) => {
            alert(err.message);
        });
    }

    async function updateUser(){
        const newUserDetails = {
            firstName: firstname,
            lastName: lastname,
            username: username,
            bio: bio
        };
        console.log(newUserDetails);

        await axios
            .put("http://localhost:8081/api/users/" + auth.user.user_id, newUserDetails, options)
            .then(()=> {
                getUser();
                alert("Profile updated successfully");
                setModal(false);
            })
            .catch((err) => {
                console.log(err);
            });     
    }

    async function deleteUser(){
        console.log(auth.user.user_id);
        await axios
            .delete("http://localhost:8081/api/users/" + auth.user.user_id, options)
            .then(() => {
                getUser();
                navigate("/profile")
                alert("Profile Deleted Successfully");
                setModal(false);
            })
    }

    return(
        <div>
            <Modal
                size = "lg"
                isOpen = {modal}
                toggle={() => setModal(!modal)}
            >
                <ModalHeader
                    toggle={() => setModal(!modal)}
                >
                    Edit Profile
                </ModalHeader>
                    <ModalBody>
                        <form>
                            <Row>
                                <Col lg = {12}>
                                    <div>
                                        <label htmlFor="firstname">
                                            First Name
                                        </label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            value={firstname} onChange={(e) => setFirstName(e.target.value)}
                                            />
                                    </div>
                                    <br/>
                                </Col>
                                <Col lg = {12}>
                                    <div>
                                        <label htmlFor="lastname">
                                            Last Name
                                        </label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            value={lastname} onChange={(e) => setLastName(e.target.value)}
                                            />
                                    </div>
                                    <br/>
                                </Col>
                                <Col lg = {12}>
                                    <div>
                                        <label htmlFor="username">
                                            Username
                                        </label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            value={username} onChange={(e) => setUserName(e.target.value)}
                                            />
                                    </div>
                                    <br/>
                                </Col>
                                <Col lg = {12}>
                                    <div>
                                        <label htmlFor="bio">
                                            Bio
                                        </label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            value = {bio} onChange={(e) => setBio(e.target.value)}
                                            />
                                    </div>
                                </Col>
                            </Row>
                        </form>
                        <br/>
                        <button className="bg-blue-600 px-5 py-1 rounded-lg text-white font-semibold"
                                onClick={() => updateUser()}>
                                <i className="bx bx-plus-circle text-xl mr-2"></i>
                                Edit Profile
                        </button>
                        <br/>
                        <br/>
                        <button className="bg-blue-600 px-5 py-1 rounded-lg text-white font-semibold"
                                onClick={() => deleteUser()}>
                                <i className="bx bx-plus-circle text-xl mr-2"></i>
                                Delete Profile
                        </button>
                    
                    </ModalBody>
            </Modal>


            <div className=" w-full flex justify-center w-80" style={{ height: '348px' }}>
                <div className="flex flex-col">
                    <div className="md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg
                        bg-gradient-to-b from-gray-100 via-gray-100 to-gray-400"
                        style={{ width: '940px', height: '300px' }}>
                        {/* // cover photo */}
                        <div className="">
                            {/* profile photo */}
                            <img src="https://i.insider.com/5c8936d026c84b24b711d224?width=700"
                                className="rounded-full md:absolute top-48 inset-x-96 border-4 border-white w-40 h-40"
                                style={{ width: '168px', height: '168px' }} />
                        </div>
                    </div>
                </div>
            </div>
            {/* // INFOS */}
            <div className="flex justify-center flex-col mt-5 mb-3.5">
                <h1 className="text-center font-bold text-3xl">Can Canbolat</h1>
                <a href="#" className="text-center text-blue-700 font-semibold">Add Bio</a>
                <hr className="full flex self-center w-2/3 mt-2" />
            </div>
            {/* // END INFOS */}
            {/* // TABS */}
            <div className="w-full flex justify-center">
                <div className="flex justify-between mb-2.5">
                    <ul className="flex px-5 py-1.5">
                        <li className="px-3 font-semibold text-gray-600"><a href="#">Posts
                        </a></li>
                        <li className="px-3 font-semibold text-gray-600"><a href="#">Following
                        </a></li>
                        <li className="px-3 font-semibold text-gray-600"><a href="#">Followers</a></li>
                        {/*<li className="px-3 font-semibold text-gray-600"><a href="#">Photos</a></li>
                        <li className="px-3 font-semibold text-gray-600"><a href="#">Story Archive</a></li>
                        <li className="px-3 font-semibold text-gray-600"><a href="#">More</a></li>*/}
                    </ul>
                    <ul className="flex mb:pl-14">
                        <li className="px-2 font-semibold">
                            <button className="bg-blue-600 px-5 py-1 rounded-lg text-white font-semibold">
                                <i className="bx bx-plus-circle text-xl mr-2"></i>
                                Add Post
                            </button>
                        </li>
                        <li className="px-2 font-semibold">
                            <button className="bg-blue-600 px-5 py-1 rounded-lg text-white font-semibold">
                                <i className="bx bx-plus-circle text-xl mr-2"></i>
                                Add to Story
                            </button>
                        </li>
                        <li className="px-2 font-semibold">
                            <button className="bg-gray-200 px-5 py-1 rounded-lg text-black font-semibold" onClick={()=>setModal(true)}>
                                <i className="bx bx-edit-alt mr-2 text-xl"></i>
                                Edit Profile
                            </button>
                        </li>
                        <li className="px-2 font-semibold">
                            <button className="bg-gray-200 px-3 py-1 rounded-lg text-black font-semibold">
                                ...
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            {/* // END TABS */}

        </div>
    )
}

export default ProfileHeader