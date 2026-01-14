import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';

const authService = new AuthService(new AuthRepository());

// 1️⃣ SIGNUP
export const signup = async (req: Request, res: Response) => {
  const user = await authService.signup(req.body);

  res.status(201).json({
    success: true,
    message: 'Signup successful',
    user
  });
};


// 2️⃣ LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      ...data
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// 3️⃣ PROFILE
export const profile = async (req: any, res: Response) => {
  try {
    const user = await authService.profile(req.user.id);
    res.status(200).json({
      success: true,
      user
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
