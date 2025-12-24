import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";
import { Chessboard, ChessboardOptions } from "react-chessboard";
import { useSearchParams } from "next/navigation";

export function DesktopLayout() {
    const chessgameRef=useRef(new Chess());
    const options:ChessboardOptions={
      boardStyle:{
        height:500,
        width:500,
      }
    }
    const [chessPosition,setchessPosition]=useState<string|null>();
    console.log(chessPosition)
    const params =useSearchParams()
    const id=params.get('id')
    useEffect(()=>{
    const chessGame=chessgameRef.current;
      if(id?.trim()=="") return;
      setchessPosition(chessGame.fen())
    },[id,chessgameRef])
    
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
