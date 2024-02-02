import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'use-websocket';

const WebSocketContext = React.createContext();

export const useWebSocketContext = () => {
  return React.useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
  const [socketUrl, setSocketUrl] = useState('ws://localhost:8000/socket');
  const { sendJsonMessage, readyState } = useWebSocket(socketUrl);

  const sendMessage = (message) => {
    sendJsonMessage(message);
  };

  const handleUrlChange = (newUrl) => {
    // Update the WebSocket URL
    setSocketUrl(newUrl);
  };

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('WebSocket connected');
    } else if (readyState === ReadyState.CLOSED) {
      console.log('WebSocket disconnected');
    }
  }, [readyState]);

  return (
    <WebSocketContext.Provider value={{ sendMessage, handleUrlChange }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContext;
