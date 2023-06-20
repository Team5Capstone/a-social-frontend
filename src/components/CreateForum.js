import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/CreateForum.css';

const API = process.env.REACT_APP_API_URL;

function CreateForum() {
  const navigate = useNavigate();
  const [forumTitle, setForumTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [forumDescription, setForumDescription] = useState('');
  const [forumPost, setForumPost] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [badges, setBadges] = useState([]);
  const userId = Number(localStorage.getItem('a-social'));

  useEffect(() => {
    axios
      .get(`${API}categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${API}badges`)
      .then((res) => {
        setBadges(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForum = {
      forum_title: forumTitle,
      forum_description: forumDescription,
      forum_posts: forumPost,
      forum_categories: selectedCategories,
      user_id: userId,
      badge_id: selectedBadge
    };

    axios
      .post(`${API}forums`, newForum)
      .then((res) => {
        navigate('/forums');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="create-forum-container">
      <h1>Create New Forum</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="forum-title">Forum Title:</label>
          <input
            type="text"
            id="forum-title"
            value={forumTitle}
            onChange={(e) => setForumTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="forum-description">Forum Description:</label>
          <input
            type="text"
            id="forum-description"
            value={forumDescription}
            onChange={(e) => setForumDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="forum-post">Forum Post:</label>
          <textarea
            id="forum-post"
            value={forumPost}
            onChange={(e) => setForumPost(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select name="category" id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.category_name}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="badges">Badges:</label>
          <select name="badges" id="badges">
            <option value="">Select a badge</option>
            {badges.map((badge) => (
              <option key={badge.id} value={badge.badge_type}>
                {badge.badge_type}
              </option>
            ))}
          </select>
        </div>
        <button className="sub" type="submit">
          Create Forum
        </button>
      </form>
    </div>
  );
}

export default CreateForum;

