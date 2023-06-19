import React, { useState } from 'react';
import '../style/ChatbotModal.css';
import '../style/Confetti.scss'

const ChatbotModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [moodIndex, setMoodIndex] = useState(0);
  const moods = ["I'm feeling Good.", "I'm feeling Angry", "I'm feeling Nervous", "I'm feeling Sad", "I'm feeling Worthless"];
  const [selectedMood, setSelectedMood] = useState(moods[moodIndex]);
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatting, setIsChatting] = useState(false);

  const handleButtonClick = () => {
    if (selectedMood === moods[0]) {
      setChatMessages([{ type: 'bot', text: 'We are happy to hear that!' }]);
      setShowModal(true);
    } else {
      setChatMessages([
        { type: 'bot', text: 'I\'m sorry to hear that.' },
        { type: 'bot', text: 'Would you like to chat with us?' }
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

  const handleNextPrompt = (response) => {
    let newMessages = [];
  
    if (chatMessages.length === 2) {
      if (response.toLowerCase() === 'yes') {
        newMessages.push({ type: 'bot', text: 'Are you having feelings of self-harm?' });
      } else if (response.toLowerCase() === 'no') {
        newMessages.push(
          { type: 'bot', text: 'Okay, Would you like to talk to someone?' },
        );
      }
      setChatMessages((prevMessages) => [...prevMessages, ...newMessages]);
    } else if (chatMessages.length === 3) {
      if (chatMessages[2].text === 'Okay, Would you like to talk to someone?' && response.toLowerCase() === 'yes') {
        newMessages.push(
          { type: 'bot', text: 'Would you like to be redirected to a forum?' },
        );
      } else if (chatMessages[2].text === 'Would you like to be redirected to a forum?' && response.toLowerCase() === 'yes') {
        // THIS IS NOT WORKING
        newMessages.push(
          { type: 'bot', text: 'Redirecting you to the forum...' },
        );
      } else {
        if (response.toLowerCase() === 'yes') {
          newMessages.push(
            { type: 'bot', text: `I'm sorry to hear that. Please seek help and call: 988 Lifeline provides 24/7, confidential support to people in suicidal crisis or mental health-related distress.` },
            { type: 'bot', text: 'You can also visit their website at: [Link 1 Help Line ](https://988lifeline.org/chat/)' }
          );
        } else if (response.toLowerCase() === 'no') {
          if (selectedMood === moods[1]) {
            newMessages.push(
              { type: 'bot', text: 'Here are some links to deal with anger:' },
              { type: 'bot', text: 'Link 1: [Link 1 How to control anger ](https://tinyurl.com/controlling-anger-how-to)' },
              { type: 'bot', text: 'Link 2: [Link 2 8 ways to deal with anger ](https://tinyurl.com/8-ways-to-deal-with-anger)' },
              { type: 'bot', text: 'Link 3: [Link 3 Video on how to manage anger and frustration ](https://tinyurl.com/Manage-Anger-And-Frustration)' }
            );
          } else if (selectedMood === moods[2]) {
            newMessages.push(
              { type: 'bot', text: 'Here are some links to deal with nervousness:' },
              { type: 'bot', text: 'Link 1: [Link 1 Coping with nerves ](https://tinyurl.com/coping-with-nerves)' },
              { type: 'bot', text: 'Link 2: [Link 2 15 ways to calm yourself ](https://tinyurl.com/15-ways-to-calm)' },
              { type: 'bot', text: 'Link 3: [Link 3 3 ways to overcome anxiety ](https://tinyurl.com/3-Ways-to-Overcome-Anxiety)' }
            );
          } else if (selectedMood === moods[3]) {
            newMessages.push(
              { type: 'bot', text: 'Here are some links to deal with sadness:' },
              { type: 'bot', text: 'Link 1: [Link 1 Depression vs Sadness ](https://tinyurl.com/depression-vs-sadness)' },
              { type: 'bot', text: 'Link 2: [Link 2 Coping with sadness ](https://tinyurl.com/coping-with-sadness)' },
              { type: 'bot', text: 'Link 3: [Link 3 Video advice for anxiety and depression ](https://tinyurl.com/advice-on-depression)' }
            );
          } else {
            newMessages.push(
              { type: 'bot', text: 'Here are some links to deal with self-worth:' },
              { type: 'bot', text: 'Link 1: [Link 1 Tips for dealing with feeling worthless ](https://www.painscale.com/article/tips-for-dealing-with-feeling-worthless)' },
              { type: 'bot', text: 'Link 2: [Link 2 10 Ways to Improve Self Worth ](https://tinyurl.com/10-Ways-to-Improve-Self-Worth)' },
              { type: 'bot', text: 'Link 3: [Link 3 Video on self-worth ](https://youtu.be/yi5E5a2Ky7k)' }
            );
          }
        }
      }
  
      setChatMessages((prevMessages) => [...prevMessages, ...newMessages]);
      setIsChatting(false);
    }
  };  
  
  const renderConfetti = () => {
    const confetti = [];
    for (let i = 0; i < 150; i++) {
      confetti.push(<div key={i} className={`confetti confetti${i}`}></div>);
    }
    return confetti;
  };
  

  return (
    <div className="chat-container">
      <button
        className="mood-button"
        onClick={handleButtonClick}
        onMouseEnter={handleButtonHover}
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
              {selectedMood === moods[0] && (
                <div className='feelingGood'>
                <div className='confetti-container'>
                  {renderConfetti()}
                </div>
                <p>Yay! So glad to hear that!</p>
                </div>
              )}
              {selectedMood !== moods[0] && chatMessages.length > 0 && (
                <div className="chat-messages">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`message ${message.type}`}>
                      {message.type === 'bot' && (
                        <p>
                          {message.text.includes('[Link ') ? (
                            <>
                              {message.text.split('[').map((part, i) => {
                                if (i === 0) return part;
                                const text = part.split('](')[0];
                                const link = part.split('](')[1].split(')')[0];
                                return (
                                  <>
                                    <span>{text}</span>
                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                      {part.split('](')[1].split(')')[0]}
                                    </a>
                                    {part.split(')')[1]}
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            message.text
                          )}
                        </p>
                      )}
                      {message.type === 'user' && <p>{message.text}</p>}
                    </div>
                  ))}
                </div>
              )}
              {selectedMood !== moods[0] && (
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