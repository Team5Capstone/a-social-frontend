import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

//not yet working. few adjustments must be mad.

const API = process.env.REACT_APP_API_URL;

function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [showOnlyUserPosts, setShowOnlyUserPosts] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/forums/${postId}`)
      .then((res) => {
        setPost(res.data);
        setReplies(res.data.replies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId]);

  const handleFilterChange = () => {
    setShowOnlyUserPosts(!showOnlyUserPosts);
  };

  if (!post) {
    return <div>Loading...</div>;
  }
  //not working but when it does make cute loading toggle
  let filteredReplies = replies;
  if (showOnlyUserPosts) {
    filteredReplies = replies.filter((reply) => reply.user_id === post.user_id);
  }

  return (
    <div>
      <h2>{post.forum_title}</h2>
      <p>{post.forum_description}</p>
      <p>Category:{post.forum_category}</p>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showOnlyUserPosts}
            onChange={handleFilterChange}
          />
          Show only my posts
        </label>
      </div>
      <h3>Replies:</h3>
      {filteredReplies.map((reply) => (
        <div key={reply.id}>
          <p>{reply.reply_content}</p>
          <p>Reply Created At: {reply.reply_created_at}</p>
          <p>User ID: {reply.user_id}</p>
        </div>
      ))}
      <div>
        <Link to={`/forums/${postId}/replies/new`}>Reply to this post</Link>
      </div>
      <div>
        <Link to="/forums">Back to Forum</Link>
      </div>
    </div>
  );
}

export default PostDetails;
