import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function ForumNewForm(props) {
  let navigate = useNavigate();
  const [forum, setForum] = useState({
    forum_title: "",
    forum_description: "",
    forum_posts: "",
    forum_createdAt: "", 
  });

  const addForum = (newForum) => {
    const dateTime = new Date().toLocaleString();
    newForum.forum_date = dateTime; 

    axios
      .post(`${API}/forums`, newForum)
      .then(
        () => {
          navigate(`/forums`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addForum(forum);
  };

  const handleTextChange = (event) => {
    setForum({ ...forum, [event.target.id]: event.target.value });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setForum((prevForum) => ({ ...prevForum, [name]: value }));
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <label htmlFor="forum_title">Forum Title:</label>
        <input
          type="text"
          name="forum_title"
          id="forum_title"
          required
          value={forum.forum_title}
          onChange={handleTextChange}
        />
        <label htmlFor="forum_category">Forum Category</label>
        <select
          name="forum_category"
          id="forum_category"
          value={forum.forum_category}
          onChange={handleSelectChange}
        >
          <option value="Energized">Energized</option>
          <option value="Neutral">Neutral</option>
          <option value="Overwhelming">Overwhelming</option>
          <option value="Challenging">Challenging</option>
          <option value="Average">Average</option>
          <option value="Other" selected>
            Other
          </option>
        </select>
        <label htmlFor="forum_posts">Forum Posts</label>
        <textarea
          type="text"
          name="forum_posts"
          id="forum_posts"
          required
          value={forum.forum_posts}
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" />
      </form>
      <div>
        <h3>Post:</h3>
        <p>{forum.forum_posts}</p>
        <h3>Date and Time:</h3>
        <p>{forum.forum_date}</p>
      </div>
    </div>
  );
}

export default ForumNewForm;
