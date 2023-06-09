import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../style/Forum.css"; // Import the Forum.css file

const API = process.env.REACT_APP_API_URL;

function Forum({ setOtherUserId }) {
  const [forums, setForums] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [showBackToTop, setShowBackToTop] = useState(false);

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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let filteredForums = [...forums];

  if (selectedCategory !== 'All') {
    filteredForums = filteredForums.filter((forum) => forum.category_name === selectedCategory);
  }

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

  const formatDate = (date) => {
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(date).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="forum-container">
      <h1 className="forum-title">Forum</h1>
      <div className="searchbar">
        <a href="/forums/new" className="button">Create New Forum</a>
      </div>
      <ul className="post-list">
        {filteredForums.map((forum) => {
          const user = findUserById(forum.user_id);
          return (
            <li className="post" key={forum.id}>
              <div className="post-details">
                <h1>{forum.forum_description}</h1>
                <p>Category: {forum.category}</p>
                <p>Topics: {forum.forum_topics}</p>
                <p>Created At: {formatDate(forum.forum_created_at)} {formatTime(forum.forum_created_at)}</p>
              </div>
              <div className="post-creator">
                <h2>Created by: {user ? user.username : ''}</h2>
                <Link to={`/forums/${forum.id}`}>View Post</Link>
              </div>
            </li>
          );
        })}
      </ul>
      <button
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={scrollToTop}
      >
        &uarr;
      </button>
    </div>
  );
}

export default Forum;

// Add a reply button in each forum 
// should me Create new forum a button
// Change category names in dropdown
// add boarder around each form 
// make header and footer

