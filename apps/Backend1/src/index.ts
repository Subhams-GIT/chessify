
import WebSocket, { WebSocketServer } from "ws";
import { auth } from "./lib/auth";
import { GameManager } from "./GameManager";
import { User } from "./User";
import { fromNodeHeaders} from "better-auth/node";

export const wss = new WebSocketServer({ port: 8000 });
const gameManager = new GameManager();

wss.on('listening', () => {
  console.log('listening')
})

wss.on('error', (e) => {
  console.log(e);
  process.exit(1);
})

wss.on("connection", async (ws: WebSocket, req) => {
  const rawCookie = req.headers.cookie;

  if (!rawCookie) {
    ws.close(1008, "No cookies");
    return;
  }
  console.log({ rawCookie })
  try {
    const session = await auth.api.getSession({
         headers: fromNodeHeaders(req.headers),
    });
    console.log(session)
    if (!session || !session.user) {
      ws.close(1008, "Unauthorized");
      return;
    }

    const { user } = session;
    console.log("Authenticated user:", user);

    const appUser = {
      ...user,
      displayName: user.name,
      username: user.name || user.email
    };
    gameManager.addUser(new User(ws, appUser));

    ws.on('close', () => {
      gameManager.removeUser(ws);
    });
  } catch (e) {
    console.error("Auth error:", e);
    ws.close(1008, "Internal Server Error");
    return;
  }

});
