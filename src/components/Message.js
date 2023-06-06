import React from 'react';

function Message({ message }) {
  return (
    <li className="message">
      <span className="message-sender">{message.sender}</span>
      <p className="message-content">{message.content}</p>
    </li>
  );
}

export default Message;
