import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendResponse } from '../../utils/apiResponse';
import { HTTP_STATUS, HTTP_MESSAGE } from '../../utils/httpStatus';
import { Request, Response } from 'express';

const authService = new AuthService(new AuthRepository());

export const signup = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const user = await authService.signup(req.body);

  sendResponse(
    req,
    res,
    HTTP_STATUS.CREATED,
    user,
    HTTP_MESSAGE.CREATED
  );
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const { accessToken, refreshToken, user } = await authService.login(email, password);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  sendResponse(
    req,
    res,
    HTTP_STATUS.OK,
    { accessToken, user },
    HTTP_MESSAGE.OK
  );
});

export const refresh = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Refresh token missing',
    });
    return;
  }

  const { accessToken } = await authService.refreshToken(token);

  sendResponse(
    req,
    res,
    HTTP_STATUS.OK,
    { accessToken },
    HTTP_MESSAGE.OK
  );
});

export const logout = asyncHandler(async (req: any, res: Response): Promise<any> => {
  await authService.logout(req.user.id);

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  sendResponse(
    req,
    res,
    HTTP_STATUS.OK,
    null,
    'Logged out successfully'
  );
});

export const profile = asyncHandler(async (req: any, res: Response): Promise<any> => {
  const user = await authService.profile(req.user.id);

  sendResponse(
    req,
    res,
    HTTP_STATUS.OK,
    user,
    HTTP_MESSAGE.OK
  );
});
