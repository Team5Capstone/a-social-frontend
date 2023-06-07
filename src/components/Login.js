import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${API}/users/login`, {
        email,
        password,
      });
      const data = response.data;
  
      if (response.status === 201) { // Change the status check to 201
        localStorage.setItem('a-social', JSON.stringify(data)); // Store the entire data object
        navigate('/profile');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="landing-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Please Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Please Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="signup-link">
          <p>Don't have an account?</p>
          <button onClick={handleSignupRedirect}>Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default Login;