import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfilePicture from './ProfilePicture'
import ChatBotModal from './ChatbotModal'
import '../style/Profile.css'
import axios from 'axios';

const API = process.env.REACT_APP_API_URL

function Profile({ otherUserId }) {
  const [user, setUser] = useState({});
  const [selectedAvatar, setSelectedAvatar] = useState(null); // Add selectedAvatar state
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const avatar = searchParams.get('avatar');

  useEffect(() => {
    const userId = window.localStorage.getItem('a-social');
    if (!otherUserId) {
      axios
      .get(`${API}/users/${userId}`)
      .then((res)=>{
        setUser(res.data)
      }) 
    } else {
      axios
      .get(`${API}/users/${otherUserId}`)
      .then((res)=>{
        setUser(res.data)
      }) 
    }
  }, []);

// JSON.parse(userData)
// console.log(user)
  useEffect(() => {
    const storedAvatar = localStorage.getItem('selectedAvatar'); // Retrieve selected avatar from local storage
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar);
    }
  }, []);
 console.log(otherUserId)
  return (
    <div className="profile-container">
      {!otherUserId ? (
        <>
        <ProfilePicture />
        <div className="profile-info">
          <h1>{user.username}</h1>
          <h3>{user.title}</h3>
          <p>
            <strong>My Name Is:</strong> {user.first_name} {user.last_name}
          </p>
          <p>
            <strong>My Pronouns Are:</strong> {user.pronouns}
          </p>
          <p>
            <strong>About Me:</strong> {user.about_me}
          </p>
          <Link to="/editProfile">
            <button>Edit Profile</button>
          </Link>
          <ChatBotModal className="chatbot-container"/>
        </div>
        </>
      ) : (
        <>
        <img src={user.avatar} alt='avatar'/>
        <div className="profile-info">
        <h1>{user.username}</h1>
        <h3>{user.title}</h3>
        <p>
          <strong>My Name Is:</strong> {user.first_name} {user.last_name}
        </p>
        <p>
          <strong>My Pronouns Are:</strong> {user.pronouns}
        </p>
        <p>
          <strong>About Me:</strong> {user.about_me}
        </p>
        <Link to="/inbox">
          <button>Message</button>
        </Link>
      </div>
        </>
      )}
    </div>
  );
} 

export default Profile;