import React, { useState, useEffect } from 'react';
import { useWebSocketContext } from './WebSocketContext';

const ChatArea = ({ chatId, userId }) => {
  const { sendMessage } = useWebSocketContext();
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);

  // Function to handle sending messages
  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        chatId,
        userId,
        text: messageInput,
        timestamp: new Date().toISOString(),
      };

      sendMessage(newMessage);
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  useEffect(() => {
    // Add WebSocket event listeners or any additional logic here
    // For example, receiving messages from WebSocket and updating the state
    // socket.onmessage = (event) => {
    //   const receivedMessage = JSON.parse(event.data);
    //   setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    // };
  }, []);

  return (
    <div className="chat-area">
      {/* Display messages */}
      <div className="message-list">
        {messages.map((message) => (
          <div key={message.timestamp} className={message.userId === userId ? 'sent' : 'received'}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      {/* Message input and send button */}
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatArea;
