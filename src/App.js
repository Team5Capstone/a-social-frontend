import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Posts from './pages/Posts';
import SafeSpace from './pages/SafeSpace';
import DirectMessages from './pages/DirectMessages';
import Journal from './pages/Journal';
import FourOFour from './pages/Four0Four';
import NavBar from './components/NavBar';
import Forums from './components/Forum';
import './App.css';
import NewForum from './pages/NewForum';
import User from './pages/User';
import EditProfilePage from './pages/EditProfilePage';
import PostDetails from './components/PostDetails';
import Plexi from './pages/Plexi';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/users" element={<User />} />
          <Route path="/profile" element={<SafeSpace />} />
          <Route path="/editProfile" element={<EditProfilePage />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/forums/new" element={<NewForum />} />
          <Route path="/myPosts" element={<Posts />} />
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