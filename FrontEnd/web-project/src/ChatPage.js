import React, { useContext, useState, useEffect, useCallback } from "react";
import WebSocketContext from "./WebSocketContext";
import ChatList from "./ChatList";
import ChatArea from "./ChatArea";
import ChatHeader from "./ChatHeader";

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
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/${userId}`,
        {
          headers: {
            "Token": localStorage.getItem("jwtToken").toString(),
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setUserProfile(userData); // Update user profile state
      } else {
        alert("Error fetching user profile: " + response.statusText);
      }
    } catch (error) {
      alert("Error fetching user profile: " + error);
    }
  }, [userId]);

  // Fetch user chat list
  const fetchUserChatList = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/chats", {
        headers: {
          "Token": localStorage.getItem("jwtToken").toString(),
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userChats = await response.json();
        setUserChatList(userChats);
      } else {
        alert("Error fetching user chat list: " + response.statusText);
      }
    } catch (error) {
      alert("Error fetching user chat list: " + error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchUserProfile(), fetchUserChatList()]);
      } catch (error) {
        alert("Error fetching data: " + error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, fetchUserProfile, fetchUserChatList]);

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        {/* View Profile Link - Placeholder, update the onClick logic */}
        <button onClick={() => alert("View Profile clicked!")}>
          View Profile
        </button>

        {/* Chat List */}
        <ChatList chats={userChatList} onChatSelect={handleChatSelect} />
      </div>
      <div className="chat-main">
        <h2>Chat</h2>
        {/* Display detailed chat area or a welcome message */}
        {selectedChat ? (
          <>
            {/* Display chat header */}
            <ChatHeader
              chatInfo={userChatList.find((chat) => chat.id === selectedChat)}
            />
            <ChatArea
              chatId={selectedChat}
              userProfile={userProfile}
              messages={messages}
            />
          </>
        ) : (
          <p>
            Welcome, {userProfile?.username || "User"}! Please select a chat or
            create a new one.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
