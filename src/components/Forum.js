import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../style/AllPost.css" 

const API = process.env.REACT_APP_API_URL;

function Forums({ setOtherUserId}) {
  const [forums, setForums] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate()
  
  const handleAviClick = (e) =>{
    // console.log(e.target.value)
    setOtherUserId(e.target.value)
    navigate("/profile")
    setTimeout(()=>{setOtherUserId("")}, 30000)
  }
  // console.log(otherUserId)

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(search);
  }
  
  useEffect(() => {
    axios
      .get(`${API}/forums`)
      .then((res) => {
        setForums(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(forums)
  return (
    <div className="forum-container">
      <h1>Forum</h1>
      <div className="searchbar">
        <a href="/forums/new" class="button">Create New Forum</a>
      </div>
      <ul className="post-list">
        {forums.map((forum, index) => (
          <li className="post" key={forum.id}>
            <button onClick={handleAviClick} value={forum.user_id}>Picture</button>
            <h2>{forum.forum_title}</h2>
            <p>{forum.forum_description}</p>
            <p>Created At: {forum.forum_created_at}</p>
            <p>{forum.forum_posts}</p>
            <button>reply</button>
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


// Add a reply button in each forum 
// should me Create new forum a button
// Change category names in dropdown
// add boarder around each form 
// make header and footer

