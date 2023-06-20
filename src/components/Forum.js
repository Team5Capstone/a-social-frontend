import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Forum.css';

const API = process.env.REACT_APP_API_URL;

function Forum() {
  const [forums, setForums] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('Latest');
  const [badges, setBadges] = useState([]);
  const [badgeName, setBadgeName] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [userId, setUserId] = useState('');


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
      .get(`${API}forums`)
      .then((res) => {
        setForums(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${API}users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${API}categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${API}badges`)
      .then((res) => {
        setBadges(res.data);
      })
      .catch((err) => console.log(err));
      
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);




  console.log(forums, badges)


  const changeCategory = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
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

  let filteredForums = [...forums];

  if (selectedCategory !== 'All') {
    filteredForums = forums.filter((forum) => forum.category_id === parseInt(selectedCategory));
  }

  if (sortBy === 'Oldest') {
    filteredForums.sort(compareByReverseDate);
  } else {
    filteredForums.sort(compareByDate);
  }

  return (
    <div className="forum-container">
      <h1 className="forum-title">Forum</h1>
      <div className="create">
        <Link to="/forums/new" className="button">
          Create New Forum
        </Link>
      </div>
      <div className="filter-options">
        <label htmlFor="category">Category:</label>
        <select name="category" id="category" value={selectedCategory} onChange={changeCategory}>
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
        <label htmlFor="sort">Sort By:</label>
        <select name="sort" id="sort" value={sortBy} onChange={changeSortBy}>
          <option value="Latest">Latest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>
      <ul className="post-list">
        {filteredForums.map((forum) => {
          const user = findUserById(forum.user_id);
          const isCurrentUser = user && user.id === userId;
          const tags = forum.forum_tags || [];

          // Find the category object based on the category_id
          const category = categories.find((category) => category.id === forum.category_id);
          const categoryName = category ? category.category_name : '';
          const badge = badges.find((badge) => badge.id === forum.badge_id);
          const badgeName = badge ? badge.badge_type : '';

          return (
            <li className="post" key={forum.id}>
              <div className="post-details">
                <Link to={`/forums/${forum.id}`}>
                  <h1>{forum.forum_description}</h1>
                </Link>
                <p>Category: {categoryName}</p>
                <span className={`label label-${badgeName}`}>{badgeName}</span>
                <p>
                  Created At: {formatDate(forum.forum_created_at)} {formatTime(forum.forum_created_at)}
                </p>
              </div>
              <div className="post-creator">
                <h2>Created by: {user ? user.username : ''}</h2>
              </div>
            </li>
          );
        })}
      </ul>
      <button className={`back-to-top ${showBackToTop ? 'show' : ''}`} onClick={scrollToTop}>
        &uarr;
      </button>
    </div>
  );
}

export default Forum;
