import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/Forum.css'
const API = process.env.REACT_APP_API_URL;

function ForumDetail({ setOtherUserId, otherUserId }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [forum, setForum] = useState({});
  const [users, setUsers] = useState([]);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [forums, setForums] = useState([]);
  const userId = Number(localStorage.getItem('a-social'));

  const handleAviClick = (e) => {
    setOtherUserId(e.target.value);
    navigate('/profile');
    setTimeout(() => {
      setOtherUserId('');
    }, 30000);
  };

  useEffect(() => {
    const fetchForumDetails = async () => {
      try {
        const forumResponse = await axios.get(`${API}forums/${id}`);
        setForum(forumResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUsers = async () => {
        try {
          const usersResponse = await axios.get(`${API}users`);
          setUsers(usersResponse.data);
        } catch (error) {
          console.log(error);
        }
      };
    

    const fetchReplies = async () => {
      try {
        const repliesResponse = await axios.get(`${API}forums/${id}/replies`);
        setReplies(repliesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchForumDetails();
    fetchUsers();
    fetchReplies();
  }, [id]);

  const handleReplySubmit = async () => {
    try {
      const response = await axios.post(`${API}forums/${id}/replies`, {
        reply_content: newReply,
        user_id: Number(localStorage.getItem('a-social')),
        forum_id: forum.id,
      });
      setReplies([...replies, response.data]);
      setNewReply('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReply = async (replyId) => {
    try {
      await axios.delete(`${API}forums/${id}/replies/${replyId}`);
      setReplies(replies.filter((reply) => reply.id !== replyId));
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const loggedInUserId = Number(localStorage.getItem('a-social'));

//   const findUserById = (userId) => {
//     return users.find((user) => user.id === userId);
//   };
console.log(users)
  return (
    <div className='reply-wrapper'>
      <div className='post-details'>
      <button value={forum.user_id} onClick={handleAviClick}>
        {users.map((user) => {
            if (user.id === forum.user_id) {
            return <img className='imgs' src={user.avatar} alt="avatar" />;
            }
            return null;
            })}
      </button>
      <h1>{users.map((user) => {
            if (user.id === forum.user_id) {
            return <h1>{user. username}</h1>;
            }
            return null;
            })}</h1>
      <h2>{forum.forum_title}</h2>
      <p>{forum.forum_description}</p>
      <p>Category: {forum.category || 'N/A'}</p>
      <p>Topics: {forum.forum_topics || 'N/A'}</p>
      <p>Created At: {formatDate(forum.forum_created_at)}</p>
      <p>{forum.forum_posts}</p>
      <div className='replies'>
        {replies.map((reply) => (
          <div className='replies' key={reply.id}>
            <p>{reply.reply_content}</p>
            <p>Created At: {formatDate(reply.reply_created_at)}</p>
            <h1>Created By: {users.find(user => user.id === reply.user_id)?.username || ''}</h1>
            {loggedInUserId === reply.user_id && (<button className='userD' onClick={() => handleDeleteReply(reply.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
      <div className='comment'>
        <h1>Add Reply</h1>
        <textarea
          placeholder="Write your reply..."
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
        ></textarea>
      </div>
      <button className='userD' onClick={handleReplySubmit}>Submit Reply</button>
      </div>
    </div>
  );
}

export default ForumDetail;