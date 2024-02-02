import React from 'react';

const ChatList = ({ chats, onChatSelect }) => {
  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <div key={chat.id} className="chat-item" onClick={() => onChatSelect(chat.id)}>
          <div className="chat-info">
            <img src={chat.avatar} alt={`${chat.name} Avatar`} className="avatar" />
            <div className="details">
              <h3>{chat.name}</h3>
              <p className="last-message">{chat.lastMessage}</p>
            </div>
          </div>
          {/* Additional details like online status, unread messages count, etc. */}
          {/* ... */}
        </div>
      ))}
    </div>
  );
};

export default ChatList;