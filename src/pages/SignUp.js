import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Landing.css';

const API = process.env.REACT_APP_API_URL;

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    dob: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showTOSModal, setShowTOSModal] = useState(false);

  const handleLogInRedirect = () => {
    navigate('/');
  };

  function handleTextChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isOver18(user.dob)) {
      console.log('You must be over 18 years old to sign up.');
      return;
    }

    axios
      .post(`${API}/users`, user)
      .then((response) => {
        window.localStorage.setItem('a-social', JSON.stringify(response.data));
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

  function handleSignUpButtonClick(e) {
    e.preventDefault();
    setShowTOSModal(true);
  }

  function handleAgreeButtonClick(e) {
    e.preventDefault()
    setShowTOSModal(false);
    handleSubmit(e);
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="landing-container">
      <h2 className="sign-logo">Sign Up Page</h2>
      <div className="login-box">
        <form onSubmit={handleSignUpButtonClick}>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={user.first_name}
            onChange={handleTextChange}
            required
          />
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={user.last_name}
            onChange={handleTextChange}
            required
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleTextChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Please enter Email"
            value={user.email}
            onChange={handleTextChange}
            required
          />
          <label htmlFor="password">Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleTextChange}
              required
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={user.dob}
            onChange={handleTextChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <div className="signup-link">
          <p>Already have an account?</p>
          <button onClick={handleLogInRedirect}>Log In</button>
        </div>
      </div>

      {showTOSModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Terms of Service</h2>
            <p className="tos-paragraph">
            By using this ridiculously awesome forum, you agree to the following terms and conditions. We promise it won't be as painful as stepping on a LEGO brick but if you fail to read the small print in we can not promise that we did not add in a clause similar to season 15 episode 1 of South Park. Triane wrote this. They are not to be trusted. -signed Triane. 
            </p>
            <p className="tos-paragraph">
              1. You acknowledge and agree that you are at least 18 years old to use this forum. We're all grown-ups here, except for that one immature sock puppet we keep locked in a drawer.
            </p>
            <p className="tos-paragraph">
              2. You understand that the forum is not a substitute for professional medical advice. We're not doctors, well, technically one of us is but if you trust them for anything medical you need more help than this and should consult a real medical professional for any health-related concerns.
            </p>
            <p className="tos-paragraph">
              3. Thou shall not spam the forum with cat memes. Unless, of course, your name is Amanda and/or they're exceptionally hilarious cat memes. We have a soft spot for those.
            </p>
            <p className="tos-paragraph">
              4. You agree to respect the privacy of others and not share personal or sensitive information about fellow forum members. We're all here to have a good time, not to become cyber spies or edge lords. Engaging in such is an act of treason and shall have you dealt with like Ned Stark.  
            </p>
            <p className="tos-paragraph">
              5. Speaking of swords: Thou shall not engage in virtual sword fights or any other form of virtual combat. We want this to be a safe space, not a medieval battlefield. Take that to Twitter. They love that there. 
            </p>
            <p className="tos-paragraph">
              6. You agree that you are solely responsible for your interactions and activities on the forum. We're not your babysitters, although we have an honorary babysitting license from that one time we watched our neighbor's goldfish we might be in America but we can not police the world. Forcing us to do so will have us unleash the Kraken 
            </p>
            <p className="tos-paragraph">
              7. You're still reading this? I like you. We should be friends. Add me on LinkedIn. Who am I? I already told you so you did not read this correctly. I change my mind. Good day to you. I said good day! 
            </p>
            <p className="tos-paragraph">
              8. Still here? Well, depending on your response to item 7, Hello new friend, lets keep it going. Other wise, I don't forgive you (see item 4) but we shall press on. 
            </p>
            <p className="tos-paragraph">
              9. This should have been number one but we're too deep to go back. Trigger Warnings are not spoilers they're warnings. Use them. If you post anything deemed triggering by the council of chatGPT you will be muted or band depending on how extensive the transgression. (See item 4)
            </p>
            <p className="tos-paragraph">
              10. No role playing. I won't expand. 
            </p>
            <p className="tos-paragraph">
              11. A-Social is a safe space guarded by a rings of fire a three headed 10 story attack dog. A mote (you're allowed to swim in, the water is fine but if you're tesspassing you'll have to deal with)and angels that don't believe in human concepts such as good or evil. When we asks you to be inclusive and welcoming, we don't mean we will accept things that are basic crappy human behavior. To think so makes you a fool and we do not suffer fools (see item 4)
            </p>
            <p className="tos-paragraph">
              12. Thou shall refrain from using ancient hieroglyphics as your preferred form of communication. We can barely decipher modern-day emojis, let alone hieroglyphics.
            </p>
            <p className="tos-paragraph">
              13. They were on a break. If you do not agree we are fine to agree to disagree but If you don't understand that reference why you no like "Friends." Friends good. I mean it drags on a bit and some of the couples they made make no sense but come on! If you didn't like friends what did you like? No like seriously, I want to know and if this induces some anxiety I'm sorry. You're excused. But you! Yeah you. Why you no likey comedy?!
            </p>
            <p className="tos-paragraph">
              14. Thou shall not attempt to hack the forum, doing so will create a glitch in the matrix and you are not Kazuto "Kirito" Kirigaya this won't bode well for you. Yes I'm aware I'm mixing genres. Be cool about it. It doesn't matter as long as you don't try to get in our stuff. We're just a bunch of friendly humans, not agents of doom but see item 11.
            </p>
            <p className="tos-paragraph">
            By clicking the "Agree" button below, you acknowledge that you're of legal age and won't be a dip to people and keep with a safe envoirment. Outside this envoirment you know you can not hold us responsible if you choose to meet anyone here offline. Seriously this is not Tinder but if thats what you want to do, you do you boo... just don't sue us later. Pretty please. Welcome to A-Social! 
            </p>
            <button onClick={handleAgreeButtonClick}>Agree</button>
            <button onClick={() => setShowTOSModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;