import React, { createContext, Ref, useCallback, useContext, useRef } from "react";

interface WsContextType{
    socketRef:Ref<WebSocket>
    sendMessage:(message:string)=>void,
}

export const wscontext=createContext<WsContextType|null>(null);

export const wsContextProvider=({children}:{children:React.ReactNode})=>{
    const socket=new WebSocket('http://localhost:8080');
    const socketRef=useRef<WebSocket>(socket);

    const sendMessage=useCallback((message:string)=>{
        socketRef.current.send(message);
    },[])
    return <wscontext.Provider value={{socketRef,sendMessage}}>
    
    </wscontext.Provider>

}

export const useWs=()=>useContext(wscontext)