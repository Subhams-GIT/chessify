
import { Chess } from "chess.js";
import { User } from "./User";
import { v4 } from "uuid";
export const INIT_GAME = "INIT_GAME";
export const MOVE = "MOVE";
export class Game {
  public gameId: string;
  public player1: string;
  public player2: string | null;
  public startTime = new Date(Date.now());
  public board: Chess;
  public endTime = new Date(Date.now());
  public moveTimer: NodeJS.Timeout | null = null;
  private player1moveTime = 0;
  private player2moveTime = 0;

  constructor(player1: string, player2: string | null, gameId?: string) {
    this.gameId = v4();
    this.player1 = player1;
    this.player2 = player2;
    if (this.startTime) {
      this.startTime = new Date();
      this.endTime = this.startTime;
    }
    this.board = new Chess();
  }

  makeMove(user:User, move: { from: string; to: string }) {
    if(user.GameId!=this.gameId) return new Error('INCORRECT Game id')
    if(user.id!=this.player1&&user.id!=this.player2){
      return new Error('INCORRECT ID');
    }
    if (this.board.move(move)) {
      try {
        this.board.move({ from: move.from, to: move.to });

      } catch (e) {
        console.error(e);
      }
    }
  }
}
