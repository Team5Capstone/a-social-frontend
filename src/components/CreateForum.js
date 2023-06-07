import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL;

function CreateForum() {
  const navigate = useNavigate();
  const [forumTitle, setForumTitle] = useState('');
  const [forumDescription, setForumDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/forum_categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${API}/forum_topics`)
      .then((res) => {
        setTopics(res.data);
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
      forum_category: selectedCategory,
      forum_topics: selectedTopics,
    };

    axios
      .post(`${API}/forums`, newForum)
      .then((res) => {
        // Handle success or redirect to the created forum
        navigate.push('/forums'); // Redirect to the forums page after successful forum creation
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleTopicToggle = (topicId) => {
    if (selectedTopics.includes(topicId)) {
      setSelectedTopics(selectedTopics.filter((id) => id !== topicId));
    } else {
      setSelectedTopics([...selectedTopics, topicId]);
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
          <textarea
            id="forum-description"
            value={forumDescription}
            onChange={(e) => setForumDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="topics">Topics:</label>
          {topics.map((topic) => (
            <div key={topic.id} className="topic-checkbox">
              <input
                type="checkbox"
                id={`topic-${topic.id}`}
                value={topic.id}
                checked={selectedTopics.includes(topic.id)}
                onChange={() => handleTopicToggle(topic.id)}
              />
              <label htmlFor={`topic-${topic.id}`}>{topic.topic_name}</label>
            </div>
          ))}
        </div>
        <button type="submit">Create Forum</button>
      </form>
    </div>
  );
}

export default CreateForum;
