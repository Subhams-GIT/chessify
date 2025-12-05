
import { WebSocket } from "ws";
import { user } from "../request";
export class User {
  public id: string;
  public socket: WebSocket;
  public GameId: string|null=null;
  public name: string;

  constructor(socket: WebSocket,user:user) {
    this.socket = socket;
    this.name = user.username;
    this.id=user.id
  }
}
