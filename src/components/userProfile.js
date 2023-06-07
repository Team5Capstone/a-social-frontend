// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import ProfilePicture from './ProfilePicture';
// import '../style/Profile.css';

// function UserProfile(props) {
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const userData = window.localStorage.getItem('a-social');
//     if (userData) {
//       setUser(JSON.parse(userData));
//     }
//   }, []);

//   return (
//     <div className="profile-container">
//       <img>{user.avatar}</img>
//       <div className="profile-info">
//         <h1>{user.username}</h1>
//         <h3>{user.title}</h3>
//         <p>
//           <strong>My Name Is:</strong> {user.first_name} {user.last_name}
//         </p>
//         <p>
//           <strong>My Pronouns Are:</strong> {user.pronouns}
//         </p>
//         <p>
//           <strong>About Me:</strong> {user.about_me}
//         </p>
//         <Link to="/inbox">
//           <button>Message Me</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;
