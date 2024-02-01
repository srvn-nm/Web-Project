import React, { createContext, useContext, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'use-websocket';

const WebSocketContext = createContext();

export const useWebSocketContext = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
  const [socketUrl] = useState('ws://localhost:8000/socket');
  const { sendJsonMessage, readyState } = useWebSocket(socketUrl);

  const sendMessage = (message) => {
    sendJsonMessage(message);
  };

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('WebSocket connected');
    } else if (readyState === ReadyState.CLOSED) {
      console.log('WebSocket disconnected');
    }
  }, [readyState]);

  return (
    <WebSocketContext.Provider value={{ sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContext;
