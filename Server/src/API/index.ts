import express from 'express';
import { loginRoutes } from "./login";
import { registerRoutes } from "./register";
import { authRoutes } from "./auth";
import { characterRoutes } from "./character";
import { partyRoutes } from "./party";
import { networkTestRoutes } from "./networkTest";
import { playgroundRoutes } from "../playground/api";

// Main API router that combines all API routes
export const apiRoutes = express.Router();

// Mount all API routes
apiRoutes.use("/login", loginRoutes);
apiRoutes.use("/register", registerRoutes);
apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/character", characterRoutes);
apiRoutes.use("/party", partyRoutes);
apiRoutes.use("/network-test", networkTestRoutes);
apiRoutes.use("/playground", playgroundRoutes);