import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import MyPosts from './pages/MyPosts';
import SafeSpace from './pages/SafeSpace';
import DirectMessages from './pages/DirectMessages';
import Journal from './pages/Journal';
import ForumDetail from './pages/ForumDetail';
import FourOFour from './pages/Four0Four';
import NavBar from './components/NavBar';
import Forum from './components/Forum';
import './App.css';
import NewForum from './pages/NewForum';
import AboutUs from './pages/AboutUs';
import EditProfilePage from './pages/EditProfilePage';
import PostDetails from './components/PostDetails';
import Plexi from './pages/Plexi';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [otherUserId, setOtherUserId] = useState(false);
  
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
          <Route path="/messages" element={<DirectMessages />} />
          <Route path="/plexi" element={<Plexi />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
