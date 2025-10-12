import { Game } from "./Game";
import Report from "./Utils/Reporter";
import { initializeDatabase, shutdownDatabase } from "./Database/init";
import { apiRoutes } from "./API";
import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';

dotenv.config();

export const app = express();

// CORS configuration
app.use(cors({
  origin: function(_, callback){callback(null, true)},
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 204
}));

// Body parsing middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`🔥 ${req.method} ${req.url}`);
  next();
});

// API routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 7890;

async function startServer() {
  try {
    // Initialize database first
    await initializeDatabase();

    const game = new Game();
    await game.start();

    // Start the server
    const server = app.listen(PORT, () => {
      Report.info(`Server running on port ${PORT}`);
      Report.info("🎉 Server startup completed successfully");
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down server...');
      server.close(async () => {
        await shutdownDatabase();
        process.exit(0);
      });
    });

  } catch (error) {
    Report.error(`Server startup failed: ${error}`);
    await shutdownDatabase();
    process.exit(1);
  }
}

// Start the server
startServer();