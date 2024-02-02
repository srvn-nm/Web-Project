import React, { useState, useEffect, useCallback } from 'react';
import api from './api';

const ContactChat = ({ contactId }) => {
  const [contactInfo, setContactInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch contact information when the component mounts
    const fetchContactInfo = async () => {
      try {
        const contactData = await api.getContactInfo(contactId);
        setContactInfo(contactData);
      } catch (error) {
        alert('Error fetching contact information: '+ error);
      }
    };

    fetchContactInfo();
  }, [contactId]);

  const fetchChatMessages = useCallback(async () => {
    try {
      const chatData = await api.getContactChat(contactId);
      setMessages(chatData.messages);
    } catch (error) {
      alert("Error fetching chat messages:"+ error);
    }
  }, [contactId]);

  useEffect(() => {
    // Fetch chat messages when the component mounts and when contactId changes
    fetchChatMessages();
  }, [contactId, fetchChatMessages]);

  const handleSendMessage = async () => {
    try {
      await api.sendMessageToContact(contactId, newMessage);
      setNewMessage('');
      fetchChatMessages(); // Refresh messages after sending a new message
    } catch (error) {
      alert('Error sending message: '+ error);
    }
  };

  return (
    <div className="contact-chat">
      {contactInfo && (
        <>
          {/* Display Contact Information */}
          <div className="contact-info">
            <img src={contactInfo.avatar} alt="Contact Avatar" />
            <div>
              <p>{contactInfo.name}</p>
              <p>{contactInfo.status}</p>
            </div>
          </div>

          {/* Display Chat Messages */}
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={message.sender === 'user' ? 'user-message' : 'contact-message'}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          {/* Input Area for Sending Messages */}
          <div className="message-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactChat;
