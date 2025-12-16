import { WebSocket } from "ws";
import { Game, INIT_GAME, MOVE } from "./Game";
import { User } from "./User";

export class GameManager {
  private games: Game[];
  private pendingPlayerIds: string[];
  private users: User[];
  constructor() {
    this.games = [];
    this.pendingPlayerIds = [];
    this.users = [];
  }

  addUser(user: User) {
    this.users.push(user);
    this.handleMessage(user);
  }

  private handleMessage(user: User) {
    user.socket.addEventListener("message", (messsage) => {
      const data = JSON.parse(messsage.toString());
      if (data.type === INIT_GAME) {
        if (this.pendingPlayerIds.length>0) {
         const userid=this.pendingPlayerIds.shift();
         const game=this.games.find(g=>g.player1Id===userid)
         if(game) {
          game.player2Id=data.userid
         }
        } else {
          const game = new Game(user.id, null);
          this.games.push(game);
          this.users.push(user);
          this.pendingPlayerIds.push(game.player1Id)
        }
      }

      if (data.type === MOVE) {
        const game = this.games.find(
          (game) => game.player1Id === user.id || game.player2Id === user.id
        );
        if (game) {
          game.makeMove(user, data.move);
        }
      }
    });
  }

  removeUser(ws:WebSocket){
    const user=this.users.find(user=>user.socket===ws)
    if(!user){
      throw new Error('user not found')
    }

    this.users.splice(Number.parseInt(user.id),1)
  }
}
