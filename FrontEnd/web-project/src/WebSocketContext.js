import React, { createContext, useContext, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'use-websocket';

const WebSocketContext = createContext();

export const useWebSocketContext = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
  // اطلاعات اتصال WebSocket
  const [socketUrl, setSocketUrl] = useState('ws://localhost:8000/socket');
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl);

  // ارسال پیام
  const sendMessage = (message) => {
    sendJsonMessage(message);
  };

  // استفاده از useEffect برای رفتارهای جانبی در اتصال WebSocket
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      // اتصال برقرار شد
      console.log('WebSocket connected');
    } else if (readyState === ReadyState.CLOSED) {
      // اتصال قطع شد
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
