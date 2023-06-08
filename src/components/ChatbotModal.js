import React, { useState } from 'react';
import '../style/ChatbotModal.css';

const ChatbotModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [moodIndex, setMoodIndex] = useState(0);
  const moods = ["I'm feeling Good.", "I'm feeling Angry", "I'm feeling Sad", "I'm feeling Worthless"];
  const [selectedMood, setSelectedMood] = useState(moods[moodIndex]);
  const [chatMessages, setChatMessages] = useState([]);

  const handleButtonClick = () => {
    if (selectedMood === moods[0]) {
      setChatMessages([
        { type: 'bot', text: 'We are happy to hear that!' },
      ]);
      setShowModal(true);
    } else {
      setChatMessages([
        { type: 'bot', text: 'I\'m sorry to hear that.' },
        { type: 'bot', text: 'Would you like to chat with us?' },
      ]);
      setShowModal(true);
    }
  };

  const handleButtonHover = () => {
    let index = moodIndex + 1;
    if (index >= moods.length) {
      index = 0;
    }
    setMoodIndex(index);
    setSelectedMood(moods[index]);
  };

  const handleButtonLeave = () => {
    setSelectedMood('How are you feeling?');
  };

  const handleNextPrompt = (response) => {
    let newMessages = [];

    switch (moodIndex) {
      case 0: // Good
        // No further questions
        break;
      case 1: // Angry
      case 2: // Sad
      case 3: // Worthless
        if (response === 'yes') {
          newMessages.push({ type: 'bot', text: 'Are you having feelings of self-harm?' });
          setChatMessages((prevMessages) => [...prevMessages, ...newMessages]);
        } else {
          handleNoClick();
        } 
        break;
      default:
        break;
    }
  };
  
  
  const handleYesClick = () => {
    const selectedMood = moods[moodIndex];
    let newMessages = [];

    if (selectedMood === moods[1]) {
      // Anger
      newMessages.push(
        { type: 'bot', text: 'Please seek help by following this link: hotline-website-link' },
        { type: 'bot', text: 'If you need immediate assistance, please call the hotline at: hotline-number' }
      );
    } else if (selectedMood === moods[2]) {
      // Sadness
      newMessages.push(
        { type: 'bot', text: 'Please seek help by following this link: hotline-website-link' },
        { type: 'bot', text: 'If you need immediate assistance, please call the hotline at: hotline-number' }
      );
    } else if (selectedMood === moods[3]) {
      // Worthless
      newMessages.push(
        { type: 'bot', text: 'Please seek help by following this link: hotline-website-link' },
        { type: 'bot', text: 'If you need immediate assistance, please call the hotline at: hotline-number' }
      );
    }
    setChatMessages((prevMessages) => [...prevMessages, ...newMessages]);
  };
  
  const handleNoClick = () => {
    const selectedMood = moods[moodIndex];
    let newMessages = [];
  
    if (selectedMood === moods[1]) {
      newMessages.push(
        { type: 'bot', text: 'Here is a link on ways to deal with anger: ways-to-deal-link' }
      );
    } else if (selectedMood === moods[2]) {
      newMessages.push(
        { type: 'bot', text: 'Here is a link on ways to deal with sadness: ways-to-deal-link' }
      );
    }else{
      newMessages.push(
        { type: 'bot', text: 'Here is a link on ways to deal with self-worth: ways-to-deal-link' }
      );
    }
  
    setChatMessages((prevMessages) => [...prevMessages, ...newMessages]);
  };

  return (
    <div className="chat-container">
      <button
        className="mood-button"
        onClick={handleButtonClick}
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeave}
      >
        {selectedMood}
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-button" onClick={() => setShowModal(false)}>
              Close
            </button>
            <div className="chat-content">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/021/743/105/small/chat-conversation-robot-artificial-intelligence-technology-online-communication-and-interaction-ai-chat-bot-support-virtual-assistant-in-your-device-vector.jpg"
                className="chat-image"
                alt="Chatbot"
              />
              <div className="chat-messages">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`message ${message.type}`}>
                    {message.text}
                  </div>
                ))}
              </div>
              {selectedMood === moods[0] && (
                <div className="confetti">Confetti animation goes here</div>
              )}
              {selectedMood !== moods[0] && (
                //This is not working how it should buttons should not be showing on "Im feeling good"
                <div className="prompt-buttons">
                  <button onClick={() => handleNextPrompt('yes')}>Yes</button>
                  <button onClick={() => handleNextPrompt('no')}>No</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotModal;