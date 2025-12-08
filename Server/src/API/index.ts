import express from 'express';
import { loginRoutes } from "./login";
import { registerRoutes } from "./register";
import { authRoutes } from "./auth";
import { characterRoutes } from "./character";
// Note: partyRoutes, locationRoutes, newsRoutes are now Elysia-based and mounted directly in index.ts
// Keeping Express router imports for routes that still use Express (actions, etc.)
import { actionsRoutes } from "./actions";
import { networkTestRoutes } from "./networkTest";
import { playgroundRoutes } from "../playground/api";

// Main API router that combines all Express-based API routes
// Note: Elysia-based routes (party, location, news, login, register, characterCreation) are mounted directly in index.ts
export const apiRoutes = express.Router();

// Mount Express-based API routes
apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/character", characterRoutes);
apiRoutes.use("/actions", actionsRoutes);
apiRoutes.use("/network-test", networkTestRoutes);
apiRoutes.use("/playground", playgroundRoutes);