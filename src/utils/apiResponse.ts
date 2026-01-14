import { Request, Response } from 'express';
import { HTTP_MESSAGE } from './httpStatus';

export const sendResponse = (
  req: Request,
  res: Response,
  statusCode: number,
  data: any,
  message?: string
) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    path: req.originalUrl,
    message: message ?? HTTP_MESSAGE.OK,
    data,
    timestamp: new Date().toISOString(),
  });
};
