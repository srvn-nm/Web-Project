import React, { useContext, useState, useEffect, useCallback } from 'react';
import  WebSocketContext  from './WebSocketContext';
import ChatList from './ChatList';
import ChatArea from './ChatArea';

const ChatPage = ({ userId }) => {
  const { messages } = useContext(WebSocketContext);
  const [selectedChat, setSelectedChat] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userChatList, setUserChatList] = useState([]);

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
  };

  // Placeholder function to fetch user profile details
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUserProfile(userData); // Update user profile state
      } else {
        console.error('Error fetching user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, [userId]);

  // Fetch user chat list
  useEffect(() => {
    const fetchUserChatList = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/chats');
        if (response.ok) {
          const userChats = await response.json();
          setUserChatList(userChats);
        } else {
          console.error('Error fetching user chat list:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user chat list:', error);
      }
    };

    if (userId) {
      fetchUserProfile();
      fetchUserChatList();
    }
  }, [userId, fetchUserProfile]);

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        {/* View Profile Link - Placeholder, update the onClick logic */}
        <button onClick={() => alert('View Profile clicked!')}>
          View Profile
        </button>

        {/* Chat List */}
        <ChatList chats={userChatList} onChatSelect={handleChatSelect} />
      </div>
      <div className="chat-main">
        <h2>Chat</h2>
        {/* Display detailed chat area or a welcome message */}
        {selectedChat ? (
          <ChatArea
            chatId={selectedChat}
            userId={userId}
            messages={messages} // Pass messages to ChatArea
          />
        ) : (
          <p>Welcome, {userProfile?.username || 'User'}! Please select a chat or create a new one.</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
