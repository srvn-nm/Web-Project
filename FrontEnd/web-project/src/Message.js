import React from "react";

const Message = ({ text, isSent }) => {
  return (
    <div className={`message ${isSent ? "sent" : "received"}`}>{text}</div>
  );
};

export default Message;
