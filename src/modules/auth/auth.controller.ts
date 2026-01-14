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
  const data = await authService.login(email, password);

  sendResponse(
    req,
    res,
    HTTP_STATUS.OK,
    data,
    HTTP_MESSAGE.OK
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
