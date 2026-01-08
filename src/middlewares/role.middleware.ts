// Role-based access control middleware (stub)
import { Request, Response, NextFunction } from 'express';

export function roleMiddleware(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    // TODO: check user role
    next();
  };
}
