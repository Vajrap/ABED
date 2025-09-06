import { connectionManager } from "../Connection/connectionManager";
import type { News } from "./News";

class Postman {
  deliver(newsList: News[]) {
    for (const news of newsList) {
      const recipients = connectionManager.getConnectionsByScope(news.scope);

      for (const ws of recipients) {
        if (ws.readyState === ws.OPEN) {
          ws.send(
            JSON.stringify({
              type: "NEWS",
              data: news,
            }),
          );
        }
      }
    }
  }
}

export const postman = new Postman();
