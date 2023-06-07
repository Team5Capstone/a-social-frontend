import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfilePicture from "./ProfilePicture";
const API = process.env.REACT_APP_API_URL;

function EditProfile() {
  let navigate = useNavigate();
  const id = useParams()
  
  const [updateUser, setUpdateUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    pronouns: "",
    about_me: "",
  });
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem("a-social"));
    if (userData) {
      setUser(userData);
      setUpdateUser(userData);
    }
  }, []);

  const updateUserProfile = (updatedUser) => {
    axios
      .put(`${API}/users/${updatedUser.id}`, updatedUser) 
      .then(() => {
        window.localStorage.setItem("a-social", JSON.stringify(updatedUser));
        navigate(`/profile`);
      })
      .catch((error) => console.error(error));
  };
  

  const handleTextChange = (event) => {
    setUpdateUser({ ...updateUser, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserProfile(user);
  };

  return (
    <div>
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
        <input
          type="text"
          name="about_me"
          id="about_me"
          value={updateUser.about_me}
          onChange={handleTextChange}
        />
        <button className="submitButton">Submit</button>
      </form>
    </div>
  );
}

export default EditProfile;

