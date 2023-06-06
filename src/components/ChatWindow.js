import React from 'react';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';
import '../style/ChatWindow.css'

function ChatWindow() {
  return (
    <div className="chat-window">
      <MessageDisplay />
      <MessageInput />
    </div>
  );
}

export default ChatWindow;
