import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
        const forumResponse = await axios.get(`${API}/forums/${id}`);
        setForum(forumResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUsers = async () => {
        try {
          const usersResponse = await axios.get(`${API}/users`);
          setUsers(usersResponse.data);
        } catch (error) {
          console.log(error);
        }
      };
    

    const fetchReplies = async () => {
      try {
        const repliesResponse = await axios.get(`${API}/forums/${id}/replies`);
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
      const response = await axios.post(`${API}/forums/${id}/replies`, {
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
      await axios.delete(`${API}/forums/${id}/replies/${replyId}`);
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
    <div>
      <button value={forum.user_id} onClick={handleAviClick}>
        {users.map((user) => {
            if (user.id === forum.user_id) {
            return <img src={user.avatar} alt="avatar" />;
            }
            return null;
            })}
      </button>
      <h1>{users.map((user) => {
            if (user.id === forum.user_id) {
            return <p>{user. username}</p>;
            }
            return null;
            })}</h1>
      <h2>{forum.forum_title}</h2>
      <p>{forum.forum_description}</p>
      <p>Category: {forum.category}</p>
      <p>Topics: {forum.forum_topics}</p>
      <p>Created At: {formatDate(forum.forum_created_at)}</p>
      <p>{forum.forum_posts}</p>
      <div className='replies'>
        {replies.map((reply) => (
          <div key={reply.id}>
            <p>{reply.reply_content}</p>
            <p>Created At: {formatDate(reply.reply_created_at)}</p>
            <h1>{users.includes(reply.user) ? users[0].username : ''}</h1>
            {loggedInUserId === reply.user_id &&(
            <button onClick={() => handleDeleteReply(reply.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
      <div className='comment'>
        <h3>Add Reply:</h3>
        <textarea
          placeholder="Write your reply..."
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
        ></textarea>
      </div>
      <button onClick={handleReplySubmit}>Submit Reply</button>
    </div>
  );
}

export default ForumDetail;






