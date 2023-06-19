// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';

// //not yet working. few adjustments must be mad.

// const API = process.env.REACT_APP_API_URL;

// function PostDetails() {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);
//   const [replies, setReplies] = useState([]);
//   const [showOnlyUserPosts, setShowOnlyUserPosts] = useState(false);

//   useEffect(() => {
//     axios
//       .get(`${API}/forums/${postId}`)
//       .then((res) => {
//         setPost(res.data);
//         setReplies(res.data.replies);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [postId]);

//   const handleFilterChange = () => {
//     setShowOnlyUserPosts(!showOnlyUserPosts);
//   };

//   if (!post) {
//     return <div>Loading...</div>;
//   }
//   //not working but when it does make cute loading toggle
//   let filteredReplies = replies;
//   if (showOnlyUserPosts) {
//     filteredReplies = replies.filter((reply) => reply.user_id === post.user_id);
//   }

//   return (
//     <div>
//       <h2>{post.forum_title}</h2>
//       <p>{post.forum_description}</p>
//       <p>Category:{post.forum_category}</p>
//       <div>
//         <label>
//           <input
//             type="checkbox"
//             checked={showOnlyUserPosts}
//             onChange={handleFilterChange}
//           />
//           Show only my posts
//         </label>
//       </div>
//       <h3>Replies:</h3>
//       {filteredReplies.map((reply) => (
//         <div key={reply.id}>
//           <p>{reply.reply_content}</p>
//           <p>Reply Created At: {reply.reply_created_at}</p>
//           <p>User ID: {reply.user_id}</p>
//         </div>
//       ))}
//       <div>
//         <Link to={`/forums/${postId}/replies/new`}>Reply to this post</Link>
//       </div>
//       <div>
//         <Link to="/forums">Back to Forum</Link>
//       </div>
//     </div>
//   );
// }

// export default PostDetails;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL;

function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [showOnlyUserPosts, setShowOnlyUserPosts] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    axios
      .get(`${API}/forums/${postId}`)
      .then((res) => {
        setPost(res.data);
        setReplies(res.data.replies.map(reply => ({ ...reply, username: getUsername(reply.user_id) })));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId]);

  const getUsername = (userId) => {
    // Fetch the username for the given userId
    // You can use another API call or any other method to fetch the username
    // Replace this placeholder logic with your actual implementation
    if (userId === 'a-social') {
      return 'a-social';
    }
    return 'Other User';
  };

  const handleFilterChange = () => {
    setShowOnlyUserPosts(!showOnlyUserPosts);
  };

  const handleReplySubmit = () => {
    // Perform the reply submission logic
    // Implement your reply submission logic here
    console.log('Reply submitted:', replyContent);
    setReplyContent('');
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  let filteredReplies = replies;
  if (showOnlyUserPosts) {
    filteredReplies = replies.filter((reply) => reply.user_id === post.user_id);
  }

  const handleDelete = (replyId) => {
    // Perform the delete operation for the given replyId
    // Only allow deletion if the username is "a-social"
    // Implement your delete logic here
  };

  return (
    <div>
      <h2>{post.forum_title}</h2>
      <p>{post.forum_description}</p>
      <p>Category: {post.forum_category}</p>
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
          <p>Username: {reply.username}</p>
          {reply.username === 'a-social' && (
            <button onClick={() => handleDelete(reply.id)}>Delete</button>
          )}
        </div>
      ))}
      <div>
        <textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Write your reply..."
          rows={4}
          cols={50}
        />
        <button onClick={handleReplySubmit}>Submit</button>
      </div>
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

