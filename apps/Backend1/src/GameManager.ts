import { WebSocket } from "ws";
import { Game, INIT_GAME, MOVE } from "./Game";
import { User } from "./User";

export class GameManager {
  private games: Game[];
  private pendingGameId: string|null;
  private users: User[];
  constructor() {
    this.games = [];
    this.pendingGameId = null;
    this.users = [];
  }

  addUser(user:User) {
    this.users.push(user);
    this.handleMessage(user);
  }

  removeUser(socket: WebSocket) {
    const user = this.users.find((user) => user.socket === socket);
      if (!user) {
        console.error('User not found?');
        return;
      }
      this.users = this.users.filter((user) => user.socket !== socket);
  }

  private handleMessage(user:User) {
    user.socket.addEventListener('message',(messsage) => {
      const data = JSON.parse(messsage.toString());
      if (data.type === INIT_GAME) {
        if (this.pendingGameId) {
          const game = this.games.find(g => g.gameId === user.GameId);
          if (!game) return new Error('game not found!');
            game.player2 = user.id;


        } else {
          const game = new Game(user.id,null);
          this.games.push(game)
          this.users.push(user)
          this.pendingGameId = game.gameId;
        }
      }

      if (data.type === MOVE) {
        const game = this.games.find(
          (game) => game.player1 === user.id || game.player2 === user.id,
        );
        if (game) {
          game.makeMove(user, data.move);
        }
      }
    });
  }
}
