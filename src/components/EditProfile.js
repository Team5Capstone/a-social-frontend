import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfilePicture from "./ProfilePicture";
import "../style/EditProfile.css";

const API = process.env.REACT_APP_API_URL;

function EditProfile() {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("a-social"));

  const [updateUser, setUpdateUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    pronouns: "",
    about_me: "",
  });

  useEffect(() => {
    axios
      .get(`${API}users/${userId}`)
      .then((response) => {
        const userData = response.data;
        setUpdateUser(userData);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  const updateUserProfile = (updatedUser) => {
    axios
      .put(`${API}users/${userId}`, updatedUser)
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

    // Update the user profile
    updateUserProfile(updateUser);
  };

  return (
    <div className="edit-profile-container">
      <ProfilePicture />

      <form className="" onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          value={updateUser.first_name}
          onChange={handleTextChange}
        />

        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={updateUser.last_name}
          onChange={handleTextChange}
        />

        <label htmlFor="pronouns">Pronouns</label>
        <input
          type="text"
          name="pronouns"
          id="pronouns"
          value={updateUser.pronouns}
          onChange={handleTextChange}
        />

        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          value={updateUser.username}
          onChange={handleTextChange}
        />

        <label htmlFor="about_me">About Me:</label>
        <textarea
          name="about_me"
          id="about_me"
          value={updateUser.about_me}
          onChange={handleTextChange}
        ></textarea>

        <button className="submitButton">Submit</button>
      </form>
    </div>
  );
}

export default EditProfile;