import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// PAGES
import Landing from './pages/Landing';
import SignUp from './pages/SignUp'
import Posts from './pages/Posts';
import SafeSpace from './pages/SafeSpace';
import DirectMessages from './pages/DirectMessages';
import Map from './pages/Map';
import Journal from './pages/Journal';
// import ShowPost from './pages/ShowPost';
import FourOFour from './pages/Four0Four';

// COMPONENTS
import NavBar from './components/NavBar';
import Forums from './components/Forum';
import './App.css';
import NewForum from './pages/NewForum';
import User from './pages/User';
import EditProfilePage from './pages/EditProfilePage';
import PostDetails from './components/PostDetails';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [otherUserId, setOtherUserId] = useState('')

  return (
    <div className="App">
      <Router>
        {/* {signedIn && <NavBar />} */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing setSignedIn={setSignedIn} />} />
          <Route path="/signup" element={<SignUp setSignedIn={setSignedIn} />} />
          <Route path="/users" element={<User />} />
          <Route path="/profile" element={<SafeSpace otherUserId={otherUserId}/>} />
          <Route path="/editProfile" element={<EditProfilePage />} />
          <Route path="/forums" element={<Forums setOtherUserId={setOtherUserId} />} />
          {/* <Route exact path="/forums/:id" element={<ShowPost />} /> */}
          <Route path="/forums/new" element={<NewForum />} />
          <Route path="/myPosts" element={<Posts />} />
          <Route path="/messages" element={<DirectMessages />} />
          <Route path="/maps" element={<Map />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
