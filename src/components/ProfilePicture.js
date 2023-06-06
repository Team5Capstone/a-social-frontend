import React, { useState, useEffect } from 'react';
import Cat from '../assets/3.png';
import Squirrel from '../assets/4.png';
import Panda from '../assets/5.png';
import Fox from '../assets/6.png';
import Dog from '../assets/7.png';
import Porcupine from '../assets/8.png';
import Bird from '../assets/9.png';
import Owl from '../assets/10.png';
import Raccoon from '../assets/11.png';
import Penguin from '../assets/12.png';
import Default from '../assets/Default.png';
import '../style/AvatarSelector.css';

const AvatarSelector = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(Default);
  const [showModal, setShowModal] = useState(false);

  const avatarOptions = [
    { src: Cat, alt: 'Avatar 1' },
    { src: Squirrel, alt: 'Avatar 2' },
    { src: Panda, alt: 'Avatar 3' },
    { src: Fox, alt: 'Avatar 4' },
    { src: Dog, alt: 'Avatar 5' },
    { src: Porcupine, alt: 'Avatar 6' },
    { src: Bird, alt: 'Avatar 7' },
    { src: Owl, alt: 'Avatar 8' },
    { src: Raccoon, alt: 'Avatar 9' },
    { src: Penguin, alt: 'Avatar 10' },
  ];

  useEffect(() => {
    // Check if a previously selected avatar is stored in localStorage
    const storedAvatar = localStorage.getItem('selectedAvatar');
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar);
    }
  }, []);

  const handleProfilePictureClick = () => {
    setShowModal(true);
  };

  const selectAvatar = (avatarSrc) => {
    setSelectedAvatar(avatarSrc);
    setShowModal(false);
    localStorage.setItem('selectedAvatar', avatarSrc); // Store the selected avatar in localStorage
  };

  return (
    <div>
      <button className='' onClick={handleProfilePictureClick}>
        <img src={selectedAvatar} alt='Profile' />
      </button>
      {showModal && (
        <div className='avatarModal'>
          <h2>Select an avatar</h2>
          <div className='avatarContainer'>
            {avatarOptions.map((avatar, index) => (
              <button 
                key={index}
                className={`avatar ${selectedAvatar === avatar.src ? 'selected' : ''}`}
                onClick={() => selectAvatar(avatar.src)}
              >
                <img src={avatar.src} alt={avatar.alt} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarSelector;