import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/Forum.css';

const API = process.env.REACT_APP_API_URL;

function Forum() {
  const [forums, setForums] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');

  useEffect(() => {
    axios
      .get(`${API}/forums`)
      .then((res) => {
        setForums(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let filteredForums;
  if (selectedCategory === 'All') {
    filteredForums = forums;
  } else {
    filteredForums = forums.filter((forum) => forum.category_name === selectedCategory);
  }

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

  if (sortBy === 'Oldest') {
    filteredForums.sort(compareByReverseDate);
  } else {
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
      <div className="filters">
        <label>
          Category:
          <select value={selectedCategory} onChange={changeCategory}>
            <option value="All">All Categories</option>
            <option value="Venting and Support">Venting and Support</option>
            <option value="Accessibility">Accessibility</option>
            <option value="Vibe Check">Vibe Check</option>
            <option value="Family">Family</option>
            <option value="Hobbies">Hobbies</option>
            <option value="General Chat">General Chat</option>
          </select>
        </label>
        <label>
          Sort By:
          <select value={sortBy} onChange={changeSortBy}>
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </label>
        <Link to="/forums/new">Create New Forum</Link>
      </div>
      <ul className="post-list">
        {filteredForums.map((forum) => (
          <li className="post" key={forum.id}>
            <h2>{forum.forum_title}</h2>
            <p>{forum.forum_description}</p>
            <p>Category: {forum.category_name}</p>
            <p>Topics: {forum.forum_topics}</p>
            <p>Created At: {forum.forum_created_at}</p>
            <p>{forum.forum_posts}</p>
            <Link to={`/forums/${forum.id}`}>View Post</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Forum;





// Add a reply button in each forum 
// should me Create new forum a button
// Change category names in dropdown
// add boarder around each form 
// make header and footer

