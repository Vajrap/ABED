import { Elysia } from "elysia";
import next from "next";
import { createServer } from "http";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

// Initialize Next.js
const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();

// Initialize Elysia for API routes
const elysia = new Elysia()
  .get("/api/hello", () => {
    return { message: "Hello from Elysia + Next.js + Bun!" };
  })
  // TODO: Add more API routes here
  // .use(loginRoutes)
  // .use(registerRoutes)
  // etc.
  .onError(({ code, error }) => {
    console.error(`[Elysia Error] ${code}:`, error);
    return { error: error.message };
  });

// Prepare Next.js and start server
nextApp.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const url = req.url || "/";

      // If it's an API route, handle with Elysia
      if (url.startsWith("/api/")) {
        const response = await elysia.handle(req);

        // Convert Elysia Response to Node.js response
        if (response) {
          res.statusCode = response.status || 200;

          // Copy headers
          if (response.headers) {
            response.headers.forEach((value, key) => {
              res.setHeader(key, value);
            });
          }

          // Send body
          const body = await response.text();
          res.end(body);
          return;
        }
      }

      // Otherwise, handle with Next.js
      await handle(req, res);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Elysia API routes available at /api/*`);
  });
});
