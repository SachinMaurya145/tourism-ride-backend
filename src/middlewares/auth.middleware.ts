import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { ApiError } from '../utils/apiError';
import { HTTP_STATUS } from '../utils/httpStatus';

export const authMiddleware = (
  req: any,
  _res: Response,
  next: NextFunction
) => {
  console.log('--- Auth Middleware Start ---');
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader);

  if (!authHeader?.startsWith('Bearer ')) {
    console.log('Auth Failed: No Bearer token');
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized');
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    console.log('Decoded Token:', decoded);
    req.user = decoded;
    console.log('req.user set to:', req.user);
    next();
  } catch (e) {
    console.log('Auth Failed: Token verification error', e);
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired token');
  }
};
