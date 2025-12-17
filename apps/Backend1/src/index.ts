import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
import { User } from "./User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import http from "http";
import { INIT_GAME } from "./Game";

dotenv.config();

const PORT = 8080;
const server = http.createServer();
const wss = new WebSocketServer({ noServer: true });
const gameManager = new GameManager();

function authenticate(request: http.IncomingMessage) {
  const authHeader = request.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error(" No or invalid Authorization header");
    return null;
  }

  const token = authHeader.split(" ")[1];
  if (!token) return new Error("not authenticated");
  try {
    const user = jwt.verify(token, process.env.SECRET as string) as string;
    return user;
  } catch (err) {
    console.error(" Token verification failed:", err);
    return null;
  }
}

server.on("upgrade", (request, socket, head) => {
  const authedUser = authenticate(request);

  if (!authedUser || authedUser instanceof Error) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }

  request.user = JSON.parse(authedUser);
  wss.handleUpgrade(request, socket, head, (ws) => {
    // attach authenticated user to the connection
    (ws as any).user = authedUser;
    wss.emit("connection", ws, request);
  });
});

wss.on("connection", (ws, request) => {
  if (!request.user) return new Error("no user !");
  ws.onmessage = (message) => {
      const {type,data}=JSON.parse(JSON.stringify(message))
      switch (type){
        case INIT_GAME:
          const user = new User(ws, request.user!);
          gameManager.addUser(user);
        break;
      }
  };

  ws.on("close", () => {
    gameManager.removeUser(ws);
  });
});

server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`);
});
