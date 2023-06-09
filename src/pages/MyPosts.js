import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL;

function MyPosts() {
  const [forums, setForums] = useState([]);
  const [users, setUsers] = useState([]);
  const userId = Number(localStorage.getItem('a-social'));
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
  }, [userId]);

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

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  return (
    <div>
      <h1>My Posts</h1>
      <button onClick={handleCreatePost}>Create New Post</button>
      {forums.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {forums.map((forum) => {
            const user = users.find((user) => user.id === forum.user_id);
            return (
              <li key={forum.id}>
                <h1>{forum.forum_description}</h1>
                <p>Category: {forum.category}</p>
                <p>Topics: {forum.forum_topics}</p>
                <p>
                  Created At: {formatDate(forum.forum_created_at)}{' '}
                  {formatTime(forum.forum_created_at)}
                </p>
                <div className="post-creator">
                  <h2>Created by: {user ? user.username : ''}</h2>
                  <Link to={`/forums/${forum.id}`}>View Post</Link>
                  <button onClick={() => handleDeletePost(forum.id)}>Delete</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MyPosts;



