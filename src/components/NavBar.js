import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/NavBar.css';

function NavBar() {
  const [showForum, setShowForum] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('a-social');
    navigate('/');
  };

  const signedIn = !!window.localStorage.getItem('a-social');

  let sidebar = null;
  if (signedIn && showSettings) {
    sidebar = (
      <div className="settings-sidebar">
        <div className="sidebar-header">
          <button className="close-btn" onClick={handleSettingsClick}>
             ☞
          </button>
        </div>
        <div className="sidebar-content">
          <button className="logout-link" onClick={handleLogout}>
            Logout
          </button>
          <Link to="/faq" className="faq-link">
            TOS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      {signedIn && (
        <nav className="navbar">
          <Link to="/profile">
            <button className="profile-pic">Profile Picture</button>
          </Link>
          <div
            className="dropdown"
            onMouseEnter={() => setShowForum(true)}
            onMouseLeave={() => setShowForum(false)}
          >
            <button className="dropbtn">Forum</button>
            {showForum && (
              <div className="dropdown-content">
                <Link to="/forums">Everything</Link>
                <Link to="/myPosts">My Posts</Link>
              </div>
            )}
          </div>
          <div
            className="dropdown"
            onMouseEnter={() => setShowMessages(true)}
            onMouseLeave={() => setShowMessages(false)}
          >
            <button className="dropbtn">Messages</button>
            {showMessages && (
              <div className="dropdown-content">
                <Link to="/messages">Inbox</Link>
              </div>
            )}
          </div>
          <div
            className="dropdown"
            onMouseEnter={() => setShowExtras(true)}
            onMouseLeave={() => setShowExtras(false)}
          >
            <button className="dropbtn">Extras</button>
            {showExtras && (
              <div className="dropdown-content">
                <Link to="/plexi">Wellness Companion</Link>
                <Link to="/journal">My Journal</Link>
              </div>
            )}
          </div>

          <Link className="settings" onClick={handleSettingsClick}>
            <button className="settings-btn">Settings</button>
          </Link>
        </nav>
      )}
      <div className="content" />

      {sidebar}

      <footer className="footer">
        <p>&copy; A-SOCIAL All rights reserved.</p>
      </footer>
    </React.Fragment>

      {showSettings && (
        <div className="settings-sidebar">
          <div className="sidebar-header">
            <button className="close-btn" onClick={handleSettingsClick}>
              X
            </button>
          </div>
          <div className="sidebar-content">
            <button className="logout-link" onClick={handleLogout}>
              Logout
            </button>
            <Link to='/about'>Who We Are (A-Social) </Link>
            <Link to="/faq" className="faq-link">
              FAQ
            </Link>
          </div>
        </div>
      )}
    </>

  );
}

export default NavBar;