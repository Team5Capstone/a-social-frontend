import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfilePicture from './ProfilePicture'
import ChatBotModal from './ChatbotModal'
import '../style/Profile.css'
import axios from 'axios';
import '../style/Profile.css';

const API = process.env.REACT_APP_API_URL;

function Profile({ otherUserId }) {
  const [user, setUser] = useState({});
  const [selectedAvatar, setSelectedAvatar] = useState(null); // Add selectedAvatar state
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const avatar = searchParams.get('avatar'); //THIS IS NEVER BEING CALLED 

  useEffect(() => {
    const userId = window.localStorage.getItem('a-social');
    if (!otherUserId) {
      axios
      .get(`${API}users/${userId}`)
      .then((res) => {
        setUser(res.data);
      });
    } else {
      axios.get(`${API}users/${otherUserId}`)
      .then((res) => {
        setUser(res.data);
      });
    }
  }, [otherUserId]); 

  useEffect(() => {
    const storedAvatar = localStorage.getItem('selectedAvatar');
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar);
    }
  }, []);

  return (
    <div className="profile-container">
      <div className='profile-content'>
      {!otherUserId ? (
        <>
        <ProfilePicture />
        <div className="profile-info">
          <ChatBotModal className="chatbot-container"/>
          <h1>{user.username}</h1>
          <p className='name'>
            <strong>My Name Is:</strong> {user.first_name} {user.last_name}
          </p>
          <p className='pronouns'>
            <strong>My Pronouns Are:</strong> {user.pronouns}
          </p>
          <p className='aboutSection'>
            <strong>About Me:</strong> {user.about_me}
          </p>
          <Link to="/editProfile">
            <button>Edit Profile</button>
          </Link>
        </div>
        </>
      ) : (
        <>
          <img src={user.avatar} alt="avatar" />
          <div className="profile-info">
            <h1>{user.username}</h1>
            <p className='name'>
              <strong>My Name Is:</strong> {user.first_name} {user.last_name}
            </p>
            <p className='pronouns'>
              <strong>My Pronouns Are:</strong> {user.pronouns}
            </p>
            <p className='aboutSection'>
              <strong>About Me:</strong> {user.about_me}
            </p>
          </div>
        </>
      )}
      </div>
    </div>
  );
}

export default Profile;
