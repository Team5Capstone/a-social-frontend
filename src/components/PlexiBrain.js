import React, { useEffect, useRef, useState } from 'react';
import '../style/ChatbotModal.css';
import babybot from '../assets/PLEXI.png';

function PlexiBrain() {
  const recognition = useRef(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Speech recognition is not supported.');
      return;
    }

    recognition.current = new window.webkitSpeechRecognition();
    recognition.current.continuous = true; // Set continuous to true for responsive listening
    recognition.current.lang = 'en-US';

    recognition.current.onresult = (event) => {
      const result = event.results[event.results.length - 1][0].transcript;
      handleSpeech(result);
    };

    recognition.current.onerror = (event) => {
      console.log('Speech recognition error:', event.error);
    };
  }, []);

  const handleSpeech = (speech) => {
    const lowercaseSpeech = speech.toLowerCase();

    if (lowercaseSpeech.includes('plexi')) {
      setResponseMessage('Hello!');
      speakResponse('Hello!');
    } else if (lowercaseSpeech.includes('open my spotify')) {
      setResponseMessage('Sure! Opening Spotify!');
      speakResponse('Sure! Opening Spotify!');
      window.open('https://open.spotify.com/track/05wIrZSwuaVWhcv5FfqeH0?si=32dca459f79a4460', '_blank');
    } else if (lowercaseSpeech.includes('how are you feeling today')) {
      setResponseMessage("I'm an AI, so I don't have feelings, but I'm here to help you. How can I assist you today?");
      speakResponse("I'm an AI, so I don't have feelings, but I'm here to help you. How can I assist you today?");
    } else if (lowercaseSpeech.includes('what can you help me with')) {
      setResponseMessage('I can assist you with wellness-related topics, suggest relaxation techniques, or provide information about healthy habits. How can I assist you today?');
      speakResponse('I can assist you with wellness-related topics, suggest relaxation techniques, or provide information about healthy habits. How can I assist you today?');
    } else if (lowercaseSpeech.includes('tell me about your day')) {
      setResponseMessage("As an AI, I don't experience days. But I'm here to chat with you and provide support. How can I assist you today?");
      speakResponse("As an AI, I don't experience days. But I'm here to chat with you and provide support. How can I assist you today?");
    } else if (lowercaseSpeech.includes('relaxation techniques')) {
      setResponseMessage('Sure! Here are a few relaxation techniques you can try: deep breathing, progressive muscle relaxation, guided meditation, or listening to calming music. Let me know if you want more information on any of these techniques!');
      speakResponse('Sure! Here are a few relaxation techniques you can try: deep breathing, progressive muscle relaxation, guided meditation, or listening to calming music. Let me know if you want more information on any of these techniques!');
    } else if (lowercaseSpeech.includes('my goals for today')) {
      setResponseMessage('That sounds great! What are your goals for today?');
      speakResponse('That sounds great! What are your goals for today?');
    } else {
      setResponseMessage("Sorry, I didn't understand.");
      speakResponse("Sorry, I didn't understand.");
    }
  };

  const speakResponse = (message) => {
    const speechSynthesis = window.speechSynthesis;
    const speechUtterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(speechUtterance);
  };

  const startSpeechRecognition = () => {
    setIsListening(true);
    recognition.current.start();
  };

  const stopSpeechRecognition = () => {
    setIsListening(false);
    recognition.current.stop();
  };

  return (
    <div className="chatbot-container">
        <h1 className="chatbot-heading">PLEXI</h1>
      <aside>
        <img src={babybot} className="chat-image" alt="Chatbot" />
      </aside>
      <main>
        <p className="chatbot-message">{responseMessage}</p>
        {!isListening ? (
          <button className="start-button" onClick={startSpeechRecognition}>
            Start Speech Recognition
          </button>
        ) : (
          <button className="stop-button" onClick={stopSpeechRecognition}>
            Stop Speech Recognition
          </button>
        )}
      </main>
    </div>
  );
}

export default PlexiBrain;