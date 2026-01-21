import { WebSocket } from "ws";
import { Game, INIT_GAME, MOVE } from "./Game";
import { User } from "./User";
import { createClient, RedisClientType } from "redis";

const connection = {
  url: ""
}

export class GameManager {
  private games: Game[];
  private pendingPlayerIds: WebSocket|null;
  private users: User[];
  public redisClient: RedisClientType;
  static manager: GameManager;

  constructor() {
    this.games = [];
    this.pendingPlayerIds = null;
    this.users = [];
    this.redisClient = createClient(connection) 
  }

  getInstance() {
    if (GameManager.manager) {
      return GameManager.manager
    }
    else return new GameManager;
  }

  addUser(user: User) {
    this.users.push(user);
    this.handleMessage(user);
  }

  private handleMessage(user: User) {
    user.socket.addEventListener("message", (messsage) => {
      const data = JSON.parse(messsage.toString());
      if (data.type === INIT_GAME) {
        if (this.pendingPlayerIds) {
         const game=new Game(this.pendingPlayerIds,user.socket);
         this.games.push(game)
         this.pendingPlayerIds=null;
        } else {
         this.pendingPlayerIds=user.socket;
        }
      }

      if (data.type === MOVE) {
        const game = this.games.find(
          (game) => game.player1 === user.socket || game.player2 === user.socket
        );
        if (game) {
          game.makeMove(user,data.move)
        }
      }
    });
  }

  removeUser(ws: WebSocket) {
    const user = this.users.find(user => user.socket === ws)
    if (!user) {
      throw new Error('user not found')
    }

    this.users.splice(Number.parseInt(user.id), 1)
  }
}
