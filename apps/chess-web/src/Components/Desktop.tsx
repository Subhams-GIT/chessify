import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";
import { Chessboard, ChessboardOptions } from "react-chessboard";
import { useParams } from "react-router";

export function DesktopLayout() {
    const chessgameRef=useRef(new Chess());
    const chessGame=chessgameRef.current;
    const options:ChessboardOptions={
      boardStyle:{
        height:500,
        width:500,
      }
    }
    const [chessPosition,setchessPosition]=useState(chessGame.fen());
    console.log(chessPosition)
    const {id} =useParams()
    
    useEffect(()=>{
      if(id?.trim()=="") return;
    },[])
    
  return (
    <div className="flex h-screen gap-4 p-4">
      {/* Board */}
      <div className="flex justify-center items-center">
        <Chessboard options={options}/>
      </div>

      {/* Side panels */}
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex-1 rounded-xl border" />
        <div className="flex-1 rounded-xl border" />
      </div>
    </div>
  );
}
