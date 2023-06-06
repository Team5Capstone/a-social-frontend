import React, { useState } from 'react';

function MessageInput() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    // Implement the logic to send the message using Firebase or any other method
    console.log('Sending message:', inputValue);
    setInputValue('');
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default MessageInput;
