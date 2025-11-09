import type { NextFunction, Request, Response } from "express";
import Report from "../Utils/Reporter";

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  Report.debug("Request logged (middleware)", {
    method: req.method,
    url: req.url,
    ip: req.ip,
  });
  next();
}