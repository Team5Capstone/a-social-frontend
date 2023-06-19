import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/CreateForum.css';

const API = process.env.REACT_APP_API_URL;

function CreateForum() {
  const navigate = useNavigate();
  const [forumTitle, setForumTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [forumDescription, setForumDescription] = useState('');
  const [forumPost, setForumPost] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const userId = Number(localStorage.getItem('a-social'));

  useEffect(() => {
    axios
      .get(`${API}/categories`)
      .then((res) => {
        setCategories(res.data);
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
      forum_tags: tags.split(',').map((tag) => tag.trim()),
      user_id: userId,
    };

    axios
      .post(`${API}/forums`, newForum)
      .then((res) => {
        navigate('/forums');
      })
      .catch((err) => {
        console.log(err);
      });
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
          <label htmlFor="forum-post">Forum post:</label>
          <textarea
            id="forum-post"
            value={forumPost}
            onChange={(e) => setForumPost(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags (comma-separated)"
          />
        </div>
        <div className="form-group">
  <label htmlFor="categories">Categories:</label>
  {categories.map((category) => (
    <div key={category.id} className="category-checkbox">
      <input
        type="checkbox"
        id={`category-${category.id}`}
        value={category.category_name}
        checked={selectedCategories.includes(category.category_name)}
        onChange={() => handleCategoryToggle(category.category_name)}
      />
      <label htmlFor={`category-${category.id}`}>{category.category_name}</label>
    </div>
  ))}
</div>

        <button className="sub" type="submit">
          Create Forum
        </button>
      </form>
    </div>
  );
}

export default CreateForum;
