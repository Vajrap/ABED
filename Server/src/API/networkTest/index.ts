import express, { type Request, type Response } from 'express';
import Report from "../../Utils/Reporter";

export const networkTestRoutes = express.Router();

networkTestRoutes.get("/", async (req: Request, res: Response) => {
  console.log("🔥 NETWORK TEST ROUTE HIT!");
  Report.info("Network test successful");
  return res.json({ success: true, message: "Network test successful" });
});