import { Chess } from "chess.js";
import { User } from "./User";
import { v4 } from "uuid";

import { WebSocket } from "ws";
export const INIT_GAME = "INIT_GAME";
export const MOVE = "MOVE";
export const GAME_OVER="GAME OVER"
export class Game {
  public gameId: string;
  public player1: WebSocket;
  public player2: WebSocket;
  public startTime = new Date(Date.now());
  public board: Chess;
  public endTime?: Date;
  public moveTimer: NodeJS.Timeout | null = null;
  private player1moveTime = 0;
  private player2moveTime = 0;

  constructor(player1: WebSocket, player2:WebSocket, gameId?: string) {
    this.gameId = gameId || v4();
    this.player1 = player1;
    this.player2 = player2;
    if (this.startTime) {
      this.startTime = new Date();
    }
    this.board = new Chess();
    this.player1.send(JSON.stringify({
      type:INIT_GAME,
      payload:{
        color:'white'
      }
    }))
    
    this.player2.send(JSON.stringify({
      type:INIT_GAME,
      payload:{
        color:'black'
    }
    }))
  }

  makeMove(user: User, move: { from: string; to: string }) {
    if(this.board.moves.length%2==0 && user.socket!=this.player1){
      return ;
    } else if(this.board.moves.length%2==1 && user.socket!=this.player2){
      return ;
    }
    const length=this.board.moves.length;
    try {
      this.board.move(move)

      if(this.board.isCheckmate()){
        length%2==1?this.player2.emit(JSON.stringify({type:'CHECKMATE'})):this.player1.emit(JSON.stringify({type:'CHECKMATE'}))
        return ;
      }
      if(this.board.isGameOver()){
        this.player1.emit(JSON.stringify({
          type:GAME_OVER,
          playload:{
            winner:this.board.turn()=="w"?"white":"black"
          }
        }))
        this.player2.emit(JSON.stringify({
          type:GAME_OVER,
          playload:{
            winner:this.board.turn()=="w"?"white":"black"
          }
        }))
        return;
      }

      if(this.board.moves.length%2==0){
        this.player1.emit(JSON.stringify({type:'move',move}))
      }else{
        this.player2.emit(JSON.stringify({type:'move',move}))
      }


      
    } catch (error) {
      
    }
  }

  async onEnd(gameId:string,moves:string){
  }

}
