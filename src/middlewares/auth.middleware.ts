// Simple auth middleware for stubs
import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });

  const token = auth.split(' ')[1];
  // Accept the stub token and attach a dummy user id
  if (token === 'stub-token') {
    (req as any).user = { userId: '1' };
    return next();
  }

  return res.status(401).json({ message: 'Invalid token' });
}
