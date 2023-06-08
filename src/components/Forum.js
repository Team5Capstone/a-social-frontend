import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../style/AllPost.css" 

const API = process.env.REACT_APP_API_URL;

function Forum({ setOtherUserId }) {
  const [forums, setForums] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');

  const handleAviClick = (e) => {
    setOtherUserId(e.target.value);
    navigate('/profile');
    setTimeout(() => {
      setOtherUserId('');
    }, 30000);
  }

  const findUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const compareByDate = (a, b) => {
    const dateA = new Date(a.forum_created_at);
    const dateB = new Date(b.forum_created_at);
    return dateB - dateA;
  };

  const compareByReverseDate = (a, b) => {
    const dateA = new Date(a.forum_created_at);
    const dateB = new Date(b.forum_created_at);
    return dateA - dateB;
  };

  useEffect(() => {
    axios
      .get(`${API}/forums`)
      .then((res) => {
        setForums(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${API}/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let filteredForums = [...forums];

  if (selectedCategory !== 'All') {
    filteredForums = filteredForums.filter((forum) => forum.category_name === selectedCategory);
  }

  if (sortBy === 'Oldest') {
    filteredForums.sort(compareByReverseDate);
    filteredForums.sort(compareByReverseDate);
  } else {
    filteredForums.sort(compareByDate);
    filteredForums.sort(compareByDate);
  }


  const changeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };


  const changeSortBy = (e) => {
    setSortBy(e.target.value);
  };


  return (
    <div className="forum-container">
      <h1>Forum</h1>
      <div className="searchbar">
        <a href="/forums/new" class="button">Create New Forum</a>
      </div>
      <ul className="post-list">
        {filteredForums.map((forum) => {
          const user = findUserById(forum.user_id);
          return (
            <li className="post" key={forum.id}>
              <button onClick={handleAviClick} value={forum.user_id}>
                <img src={user ? user.avatar : ''} alt='avatar' />
              </button>
              <h1>{user ? user.username : ''} </h1>
              <h2>{forum.forum_title}</h2>
              <p>{forum.forum_description}</p>
              <p>Category: {forum.category}</p>
              <p>Topics: {forum.forum_topics}</p>
              <p>Created At: {forum.forum_created_at}</p>
              <p>{forum.forum_posts}</p>
              <Link to={`/forums/${forum.id}`}>View Post</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Forums;


// Add a reply button in each forum 
// should me Create new forum a button
// Change category names in dropdown
// add boarder around each form 
// make header and footer


// Add a reply button in each forum 
// should me Create new forum a button
// Change category names in dropdown
// add boarder around each form 
// make header and footer

