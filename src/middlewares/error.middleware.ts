import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { ApiError } from '../utils/apiError';
import { HTTP_STATUS, HTTP_MESSAGE } from '../utils/httpStatus';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // log full error for debugging (temporary)
  // eslint-disable-next-line no-console
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message: string = HTTP_MESSAGE.INTERNAL_SERVER_ERROR;

  /**
   * 1️⃣ Custom ApiError (your business errors)
   */
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  /**
   * 2️⃣ MongoDB Duplicate Key Error (E11000)
   */
  else if (err?.code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    // prefer `keyValue`, fall back to `keyPattern`, then try parsing the message
    const fieldFromKeys = Object.keys(err.keyValue || err.keyPattern || {})[0];
    const fieldFromMessage = (() => {
      try {
        if (!err?.message) return undefined;
        // "index: users.email_1 dup key" -> extract `email`
        const idxMatch = err.message.match(/index:\s+([^\s]+)/);
        if (idxMatch && idxMatch[1]) {
          const parts = idxMatch[1].split('.');
          const last = parts[parts.length - 1];
          return last.replace(/_[0-9]+$/, '');
        }
        // fallback: "dup key: { : \"value\" }" -> not field name, so ignore
        return undefined;
      } catch {
        return undefined;
      }
    })();

    const field = fieldFromKeys || fieldFromMessage;
    message = field ? `${field} already exists` : HTTP_MESSAGE.CONFLICT;
  }

  /**
   * 3️⃣ Mongoose Validation Error
   */
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  /**
   * 4️⃣ JWT Errors
   */
  else if (err.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Invalid or expired token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Invalid or expired token';
  }

  /**
   * 5️⃣ Fallback (Unknown error)
   */
  res.status(statusCode).json({
    success: false,
    statusCode,
    path: req.originalUrl,
    message,
    timestamp: new Date().toISOString(),
  });
};
