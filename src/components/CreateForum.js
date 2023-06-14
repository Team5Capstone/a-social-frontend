import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL;

const categories = [
  'Venting and Support',
  'Accessibility',
  'Vibe Check',
  'Family',
  'Hobbies',
  'General Chat',
];

function CreateForum() {
  const navigate = useNavigate();
  const [forumTitle, setForumTitle] = useState('');
  const [forumDescription, setForumDescription] = useState('');
  const [forumPost, setForumPost] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const userId = Number(localStorage.getItem('a-social'));

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
        // Handle success or redirect to the created forum
        navigate('/forums'); // Redirect to the forums page after successful forum creation
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
            <div key={category} className="category-checkbox">
              <input
                type="checkbox"
                id={`category-${category}`}
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
              />
              <label htmlFor={`category-${category}`}>{category}</label>
            </div>
          ))}
        </div>
        <button type="submit">Create Forum</button>
      </form>
    </div>
  );
}

export default CreateForum;
