import { Router } from 'express';
import { signup, login, profile, refresh, logout } from './auth.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

// PUBLIC
router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', refresh);

// PROTECTED
router.post('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, profile);

export default router;
