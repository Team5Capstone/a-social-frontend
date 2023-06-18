import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfilePicture from "./ProfilePicture";
import "../style/EditProfile.css"

const API = process.env.REACT_APP_API_URL;

function EditProfile() {
  let navigate = useNavigate();
  const userId = Number(localStorage.getItem('a-social'));

  const [updateUser, setUpdateUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    pronouns: "",
    about_me: "",
  });

  useEffect(() => {
    axios
      .get(`${API}/users/${userId}`)
      .then((response) => {
        const userData = response.data;
        setUpdateUser(userData);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  const updateUserProfile = () => {
    axios
      .put(`${API}/users/${userId}`, updateUser)
      .then(() => {
        navigate(`/profile`);
      })
      .catch((error) => console.error(error));
  };

  const handleTextChange = (event) => {
    setUpdateUser({ ...updateUser, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserProfile();
  };
console.log(updateUser)
  return (
    <div className="container">
      <ProfilePicture />
      <form className="form-group" onSubmit={handleSubmit}>
        <div >
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={updateUser.first_name}
            onChange={handleTextChange}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={updateUser.last_name}
            onChange={handleTextChange}
          />
        </div>
        <div>
          <label htmlFor="pronouns">Pronouns</label>
          <input
            type="text"
            name="pronouns"
            id="pronouns"
            value={updateUser.pronouns}
            onChange={handleTextChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={updateUser.username}
            onChange={handleTextChange}
          />
        </div>
        <div>
          <label htmlFor="about_me">About Me:</label>
          <input
            type="text"
            name="about_me"
            id="about_me"
            value={updateUser.about_me}
            onChange={handleTextChange}
          />
        </div>
      </form>
       <div></div> <button className="submitButton">Submit</button>
    </div>
  );
}

export default EditProfile;