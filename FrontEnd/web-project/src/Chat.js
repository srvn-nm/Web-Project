import React from "react";
import "./ChatList.css"
import ContactChat from "./ContactChat";
import GroupChat from "./GroupChat";

const Chat = ({ chatType, chatData }) => {
  return (
    <div className="chat-container">
      {chatType === "contact" && <ContactChat contactData={chatData} />}
      {chatType === "group" && <GroupChat groupData={chatData} />}
      {/* Add more chat types as needed */}
    </div>
  );
};

export default Chat;
