import React, { useState } from 'react';
import Message from './Message';

function MessageDisplay() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'User1', content: 'Hello' },
    { id: 2, sender: 'User2', content: 'Hi there!' },
  ]);

  return (
    <ul className="message-list">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </ul>
  );
}

export default MessageDisplay;
