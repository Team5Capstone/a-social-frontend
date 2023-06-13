import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../style/Forum.css"; 
const API = process.env.REACT_APP_API_URL;

function MyPosts() {
  const [forums, setForums] = useState([]);
  const [users, setUsers] = useState([]);
  const userId = Number(localStorage.getItem('a-social'));
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/forums`)
      .then((res) => {
        const filteredForums = res.data.filter((forum) => forum.user_id === userId);
        setForums(filteredForums);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${API}/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  }, [userId]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }; 


  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 200) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const formatDate = (date) => {
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(date).toLocaleTimeString(undefined, options);
  };

  const handleDeletePost = (postId) => {
    axios
      .delete(`${API}/forums/${postId}`)
      .then(() => {
        setForums((prevForums) => prevForums.filter((forum) => forum.id !== postId));
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="forum-container">
      <h1 className='forum-title'>My Posts</h1>
      <div className="create">
        <a href="/forums/new" className="button">Create New Forum</a>
      </div>
      {forums.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul className='post-list'>
          {forums.map((forum) => {
            const user = users.find((user) => user.id === forum.user_id);
            return (
              <li className="post" key={forum.id}>
                <div className='post-details'>
                <h1>{forum.forum_description}</h1>
                <p>Category: {forum.category}</p>
                <p>Topics: {forum.forum_topics}</p>
                <p>
                  Created At: {formatDate(forum.forum_created_at)}{' '}
                  {formatTime(forum.forum_created_at)}
                </p>
                </div>
                <div className="post-creator">
                  <h2>Created by: {user ? user.username : ''}</h2>
                  <button className='other-button'><Link to={`/forums/${forum.id}`} style={{ textDecoration: 'none', color: '#fff' }}>View Post</Link></button>
                  <button className='other-button' onClick={() => handleDeletePost(forum.id)} style={{ marginLeft: '4px' }}>Delete</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <button
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={scrollToTop}
      >
        &uarr;
      </button>
    </div>
  );
}

export default MyPosts;



