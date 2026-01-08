// Rate limiting middleware (stub)
import { Request, Response, NextFunction } from 'express';

export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  // TODO: implement rate limiting
  next();
}
