// Patch Bun.randomUUIDv7 FIRST, before any other imports that might use it
// This is critical for Docker environments with older Bun versions
if (typeof Bun !== 'undefined' && typeof (Bun as any).randomUUIDv7 !== 'function') {
  (Bun as any).randomUUIDv7 = () => crypto.randomUUID();
  console.log('[PATCH] Bun.randomUUIDv7 patched to use crypto.randomUUID()');
}

import { Game } from "./Game";
import Report from "./Utils/Reporter";
import { initializeDatabase, shutdownDatabase } from "./Database/init";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import dotenv from "dotenv";
import { characterCreationRoutes } from "./API/characterCreation";
import { loginRoutes } from "./API/login";
import { registerRoutes } from "./API/register";
import { partyRoutes } from "./API/party";
import { locationRoutes } from "./API/location";
import { newsRoutes } from "./API/news";

dotenv.config();

const PORT = process.env.PORT || 7890;

async function startServer() {
  try {
    // Initialize database first
    await initializeDatabase();

    const game = new Game();
    await game.start();

    // Create Elysia app with /api prefix
    const app = new Elysia()
      .use(
        cors({
          origin: true,
          methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
          credentials: true,
        })
      )
      // Request logging middleware
      .onBeforeHandle(({ request, set }) => {
        Report.debug("Incoming request", {
          method: request.method,
          url: request.url,
        });
      })
      // Health check route
      .get("/api/health", () => {
        return { status: "ok", message: "Server is running" };
      })
      // Mount API routes under /api prefix
      .group("/api", (app) => 
        app
          .use(loginRoutes)
          .use(registerRoutes)
          .use(characterCreationRoutes)
          .use(partyRoutes)
          .use(locationRoutes)
          .use(newsRoutes)
      )
      // Global error handler
      .onError(({ code, error, set }) => {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const errorStack = error instanceof Error ? error.stack : undefined;
        Report.error("Unhandled error in request pipeline", {
          error: errorMessage,
          code,
          stack: errorStack,
        });
        set.status = 500;
        return { error: 'Internal Server Error' };
      })
      .listen(PORT, () => {
        Report.info(`🚀 Elysia server running on port ${PORT}`);
        Report.info("🎉 Server startup completed successfully");
        Report.info(`🚀 Server is running on http://localhost:${PORT}`);
      });

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      Report.info('🛑 Shutting down server...');
      await shutdownDatabase();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      Report.info('🛑 Shutting down server...');
      await shutdownDatabase();
      process.exit(0);
    });

  } catch (error) {
    Report.error(`Server startup failed: ${error}`);
    await shutdownDatabase();
    process.exit(1);
  }
}

// Start the server
startServer();
