import React, { useEffect, useRef, useState } from 'react';
import '../style/ChatbotModal.css';
import babybot from '../assets/PLEXI.png';

function PlexiBrain() {
  const recognition = useRef(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isExerciseRunning, setIsExerciseRunning] = useState(false);
  const plexiName = 'plexi';

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

    if (lowercaseSpeech.includes(plexiName)) {
      if (lowercaseSpeech.includes(`hey ${plexiName}`) || lowercaseSpeech.includes(`hello ${plexiName}`)) {
        setResponseMessage('Hello!');
        speakResponse('Hello!');
      } else if (lowercaseSpeech.includes(`open spotify`)) {
        setResponseMessage('Sure! Opening Spotify!');
        speakResponse('Sure! Opening Spotify!');
        window.open('https://open.spotify.com/playlist/37i9dQZF1EVHGWrwldPRtj?si=7ab210f8f99c4d28', '_blank');
      } else if (lowercaseSpeech.includes(`how are you feeling today`)) {
        setResponseMessage("I'm an AI, so I don't have feelings, but I'm here to help you. How can I assist you today?");
        speakResponse("I'm an AI, so I don't have feelings, but I'm here to help you. How can I assist you today?");
      } else if (lowercaseSpeech.includes(`what can you help me with`)) {
        setResponseMessage('I can assist you with wellness-related topics, suggest relaxation techniques, or provide information about healthy habits. How can I assist you today?');
        speakResponse('I can assist you with wellness-related topics, suggest relaxation techniques, or provide information about healthy habits. How can I assist you today?');
      } else if (lowercaseSpeech.includes(`tell me about your day`)) {
        setResponseMessage("As an AI, I don't experience days. But I'm here to chat with you and provide support. How can I assist you today?");
        speakResponse("As an AI, I don't experience days. But I'm here to chat with you and provide support. How can I assist you today?");
      } else if (lowercaseSpeech.includes(`relaxation techniques`) || lowercaseSpeech.includes(`relaxation tips`)) {
        setResponseMessage('Sure! Here are a few relaxation techniques you can try: deep breathing, progressive muscle relaxation, guided meditation, or listening to calming music. Let me know if you want more information on any of these techniques!');
        speakResponse('Sure! Here are a few relaxation techniques you can try: deep breathing, progressive muscle relaxation, guided meditation, or listening to calming music. Let me know if you want more information on any of these techniques!');
      } else if (lowercaseSpeech.includes(`start breathing exercise`)) {
        startBreathingExercise();
      } else {
        setResponseMessage("Sorry, I didn't understand.");
        speakResponse("Sorry, I didn't understand.");
      }
    } else {
      setResponseMessage('');
    }
  };

  const speakResponse = (message) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    setIsListening(true);
    recognition.current.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.current.stop();
    setResponseMessage(''); // Clear the response message
  };

  const startBreathingExercise = () => {
    setIsExerciseRunning(true);
    const repetitionCount = 5; // Number of breathing repetitions
    const breathDuration = 5000; // Duration of each breath (in milliseconds)
    let isExerciseCancelled = false; // Flag to track if the exercise is cancelled
    let currentRepetition = 1; // Current repetition number
  
    setResponseMessage('Okay, let\'s begin.');
    speakResponse('Okay, let\'s begin.');
  
    const guideBreath = () => {
      if (currentRepetition > repetitionCount || isExerciseCancelled) {
        // Breathing exercise complete or cancelled
        if (isExerciseCancelled) {
          setResponseMessage('Breathing exercise cancelled.');
          speakResponse('Breathing exercise cancelled.');
        } else {
          setResponseMessage(`Great job! You completed ${repetitionCount} breathing repetitions. I hope you feel more relaxed now.`);
          speakResponse(`Great job! You completed ${repetitionCount} breathing repetitions. I hope you feel more relaxed now.`);
        }
        setIsExerciseRunning(false); // Set exercise running flag to false
      } else {
        setResponseMessage('Breathe in...');
        speakResponse('Breathe in...');
  
        setTimeout(() => {
          setResponseMessage('Breathe out...');
          speakResponse('Breathe out...');
          currentRepetition++;
          setTimeout(guideBreath, breathDuration);
        }, breathDuration);
      }
    };
  
    guideBreath();
  };  

  return (
    <div className="chatbot-container">
      <aside>
        <img src={babybot} className="chat-image" alt="Chatbot" />
      </aside>
      <main>
        <p className="chatbot-message">{responseMessage}</p>
        {!isListening ? (
          <button className="start-listening-button" onClick={startListening}>
            Start Speech Recognition
          </button>
        ) : (
          <button className="stop-listening-button" onClick={stopListening}>
            Stop Speech Recognition
          </button>
        )}
      </main>
    </div>
  );
}

export default PlexiBrain;