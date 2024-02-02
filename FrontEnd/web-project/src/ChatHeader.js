import React from 'react';

const ChatHeader = ({ chatInfo }) => {
  return (
    <div className="chat-header">
      {/* Display chat information (user or group) */}
      <img src={chatInfo.avatar} alt="Avatar" />
      <div>
        <h3>{chatInfo.name}</h3>
        {/* Additional information such as online status, group members count, etc. */}
      </div>
    </div>
  );
};

export default ChatHeader;
