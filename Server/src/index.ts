import { Elysia } from "elysia";
import { Game } from "./Game";
import { z } from "zod";
import { isBodyValid } from "./Utils/isBodyValid";

const game = new Game();
await game.start();

const app = new Elysia();

const LoginSchema = z.object({
  id: z.string(),
  password: z.string(),
});

app
  // We will always use REST for client -> server requests even if it's about game logic
  .post("/login", async ({ body }) => {})
  .post("/regist", async ({ body }) => {})
  .post("/guest", async ({ body }) => {})
  .post("/autoAuth", async ({ body }) => {})
  .post("/logout", async ({ body }) => {})

  // Ws will be only for server -> client communication; so the only thing client send to server is ping heartbeat
  .ws("/game", {
    open(ws) {},
    message(ws, data) {},
    close(ws) {},
  })

  .listen(7777);

console.log("Server running on port 7777 — let the seals be broken");

function mockHandleLogin(body: any) {
  if (!isBodyValid(LoginSchema, body)) {
    return { success: false, message: `Wrong message type` };
  } else {
    // validate session
    // validate if user exist
    // validate if password is right
    return { success: true };
  }
}
