import { Chess } from "chess.js";
import { User } from "./User";
import { v4 } from "uuid";
export const INIT_GAME = "INIT_GAME";
export const MOVE = "MOVE";
export class Game {
  public gameId: string;
  public player1Id: string;
  public player2Id: string | null;
  public startTime = new Date(Date.now());
  public board: Chess;
  public endTime?: Date;
  public moveTimer: NodeJS.Timeout | null = null;
  private player1moveTime = 0;
  private player2moveTime = 0;

  constructor(player1id: string, player2id: string | null, gameId?: string) {
    this.gameId = gameId || v4();
    this.player1Id = player1id;
    this.player2Id = player2id;
    if (this.startTime) {
      this.startTime = new Date();
    }
    this.board = new Chess();
  }

  makeMove(user: User, move: { from: string; to: string }) {
    if (user.GameId != this.gameId) return new Error("INCORRECT Game id");
    if (user.id != this.player1Id && user.id != this.player2Id) {
      return new Error("INCORRECT ID");
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
