import express, { type Request, type Response } from 'express';
import Report from "../../Utils/Reporter";

export const networkTestRoutes = express.Router();

networkTestRoutes.get("/", async (req: Request, res: Response) => {
  Report.debug("Network test route hit", {
    route: "/networkTest",
    ip: req.ip,
  });
  Report.info("Network test successful");
  return res.json({ success: true, message: "Network test successful" });
});