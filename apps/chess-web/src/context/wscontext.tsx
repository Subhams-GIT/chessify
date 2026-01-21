'use client'
import React, { createContext, useContext, useEffect, useRef } from "react";
interface WsContextType {
  socketRef: React.RefObject<WebSocket | null>;
  sendMessage: (message: string) => void;
  isConnected:boolean;
}

export const WsContext = createContext<WsContextType | null>(null);

export const WsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<WebSocket | null>(null);
  let isConnected=false;
  useEffect(() => {
      if(!isConnected) return ;
    const socket = new WebSocket("ws://localhost:8000");
    
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onclose = (ev) => {
      console.log(ev)
      console.log("WebSocket disconnected");
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.warn("WebSocket not open. Message not sent:", message);
    }
  };
  

  return (
    <WsContext.Provider value={{ socketRef, sendMessage ,isConnected}}>
      {children}
    </WsContext.Provider>
  );
};

export const useWs = () => {
  const context = useContext(WsContext);
  if (!context) throw new Error("useWs must be used within WsContextProvider");
  return context;
};
