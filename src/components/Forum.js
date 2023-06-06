import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../style/AllPost.css" 

const API = process.env.REACT_APP_API_URL;

function Forums() {
  const [forums, setForums] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');

  
  let filteredForums;
  if (selectedCategory === 'All') {
    filteredForums = forums;
  } else {
    filteredForums = forums.filter((forum) => forum.category === selectedCategory);
  }
  
  if (sortBy === 'Oldest') {
    filteredForums.sort((a, b) => new Date(a.forum_created_at) - new Date(b.forum_created_at));
  } else {
    filteredForums.sort((a, b) => new Date(b.forum_created_at) - new Date(a.forum_created_at));
  }
  
  const changeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  const changeSortBy = (e) => {
    setSortBy(e.target.value);
  };
  
  useEffect(() => {
    axios
      .get(`${API}/forums`)
      .then((res) => {
        setForums(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="forum-container">
      <h1>Forum</h1>
      <div className="filters">
        <label>
          Category:
          <select value={selectedCategory} onChange={changeCategory}>
            <option value="All">All Categories</option>
            <option value="Energized">Energized</option>
            <option value="Neutral">Neutral</option>
            <option value="Overwhelming">Overwhelming</option>
            <option value="Challenging ">Challenging </option>
            <option value="Average">Average</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Sort By:
          <select value={sortBy} onChange={changeSortBy}>
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </label>
        <Link to='/forums/new'>Create New Forum</Link>
      </div>
      <ul className="post-list">
        {filteredForums.map((forum, index) => (
          <li className="post" key={forum.id}>
            <h2>{forum.forum_title}</h2>
            <p>{forum.forum_description}</p>
            <p>Created At: {forum.forum_created_at}</p>
            <p>{forum.forum_posts}</p>
          </li>
        ))}
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

