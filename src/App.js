import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import MyPosts from './pages/MyPosts';
import SafeSpace from './pages/SafeSpace';
import TermsOfService from './pages/TermsOfService';
import Journal from './pages/Journal';
import ForumDetail from './pages/ForumDetail';
import FourOFour from './pages/Four0Four';
import NavBar from './components/NavBar';
import Forum from './components/Forum';
import './App.css';
import NewForum from './pages/NewForum';
import AboutUs from './pages/AboutUs';
import EditProfilePage from './pages/EditProfilePage';
import Plexi from './pages/Plexi';
import cruiserImage from './assets/PLEXI.png'; 

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [otherUserId, setOtherUserId] = useState(false);


  useEffect(() => {
    const cursor = document.createElement('img');
    cursor.src = cruiserImage;
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const moveCursor = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.body.removeChild(cursor);
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing setSignedIn={setSignedIn} />} />
          <Route path="/signup" element={<SignUp setSignedIn={setSignedIn} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<SafeSpace otherUserId={otherUserId} />} />
          <Route path="/editProfile" element={<EditProfilePage />} />
          <Route path="/forums" element={<Forum setOtherUserId={setOtherUserId} />} />
          <Route exact path="/forums/:id" element={<ForumDetail setOtherUserId={setOtherUserId} otherUserId={otherUserId} />} />
          <Route path="/forums/new" element={<NewForum />} />
          <Route path="/myPosts" element={<MyPosts />} />
          <Route path="/tos" element={<TermsOfService />} />
          <Route path="/plexi" element={<Plexi />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;