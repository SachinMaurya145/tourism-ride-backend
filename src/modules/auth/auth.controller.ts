import { Request, Response } from 'express';
import * as AuthService from './auth.service';

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const result = await AuthService.register(name, email, password);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message || 'Registration failed' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message || 'Login failed' });
  }
}

export async function me(req: Request, res: Response) {
  try {
    // middleware attaches user object: for stubs we expect { userId }
    const userId = (req as any).user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const profile = await AuthService.getProfile(userId);
    if (!profile) return res.status(404).json({ message: 'User not found' });
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
}
