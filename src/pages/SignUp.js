import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Landing.css';

const API = process.env.REACT_APP_API_URL;

const SignUp = () => {
  const navigate = useNavigate();
  let [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    dob: '',
  });

  function handleTextChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isOver18(user.dob)) {
      console.log('You must be over 18 years old to sign up.');
      return;
      navigate('/profile')
    }

    axios
      .post(`${API}/users`, user)
      .then((response) => {
        window.localStorage.setItem('a-social', JSON.stringify(response.data));
        //This holds the use state use state for the local host it's important and JD approved
        navigate('/profile');
      })
      .catch((error) => console.warn('catch error:', error));
  }

  function isOver18(dob) {
    const currentDate = new Date();
    const inputDate = new Date(dob);
    const ageDifference = currentDate - inputDate;
    const ageInYears = Math.floor(ageDifference / (1000 * 60 * 60 * 24 * 365));
    return ageInYears >= 18;
  }
 console.log(API)
  return (
    <div className="landing-container">
      <h2 className="logo">Sign Up Page</h2>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={user.first_name}
            onChange={handleTextChange}
          />
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={user.last_name}
            onChange={handleTextChange}
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleTextChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Please enter Email"
            value={user.email}
            onChange={handleTextChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleTextChange}
          />
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={user.dob}
            onChange={handleTextChange}
          />
          <button type="submit">Sign Up</button>
        </form>
        <div className="signup-link">
          <p>Already have an account?</p>
          <button>Log In</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;