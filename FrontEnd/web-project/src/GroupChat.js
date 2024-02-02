import React, { useState, useEffect } from "react";
import api from "./groupApi";
import { useWebSocketContext } from "./WebSocketContext";

const GroupChat = ({ groupId }) => {
  const [groupInfo, setGroupInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { sendMessage } = useWebSocketContext();

  useEffect(() => {
    const fetchGroupInfo = async () => {
      try {
        const groupData = await api.getGroupInfo(groupId);
        setGroupInfo(groupData);
      } catch (error) {
        alert("Error fetching group info: "+ error);
      }
    };

    const fetchGroupMessages = async () => {
      try {
        const groupMessages = await api.getGroupMessages(groupId);
        setMessages(groupMessages);
      } catch (error) {
        alert("Error fetching group messages: "+ error);
      }
    };

    fetchGroupInfo();
    fetchGroupMessages();
  }, [groupId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      return;
    }

    // Assuming you have a function to send messages through WebSocket
    sendMessage({
      type: "groupMessage",
      groupId,
      content: newMessage,
    });

    // Update the local messages state
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", content: newMessage },
    ]);

    // Clear the input field after sending the message
    setNewMessage("");
  };

  return (
    <div>
      {groupInfo && (
        <>
          <div>
            <h2>{groupInfo.name}</h2>
            <p>Members: {groupInfo.members.length}</p>
          </div>
          <div className="chat-container">
            <div className="message-list">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.sender === "user" ? "user-message" : "other-message"
                  }
                >
                  <p>{message.sender}</p>
                  <p>{message.content}</p>
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GroupChat;
