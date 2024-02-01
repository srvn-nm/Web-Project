import React, { useContext } from 'react';
import { WebSocketContext } from './WebSocketContext';

const ChatPage = () => {
  const { sendMessage, messages } = useContext(WebSocketContext);

  const handleMessageSend = (message) => {
    sendMessage(message);
  };

  return (
    <div>
      <h2>Chat</h2>
      {/* نمایش چت با استفاده از messages */}
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
      {/* ارسال پیام */}
    </div>
  );
};

export default ChatPage;
