import { type Request, type Response, type NextFunction } from 'express';
import Report from "../Utils/Reporter";

export function errorHandlerMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  Report.error("Unhandled error (middleware)", {
    error: err,
    path: req.url,
  });
  res.status(500).json({ error: 'Internal Server Error' });
}
