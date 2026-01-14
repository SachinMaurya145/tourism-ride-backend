import { Router } from 'express';
import { signup, login, profile } from './auth.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

// PUBLIC
router.post('/signup', signup);
router.post('/login', login);

// PROTECTED
router.get('/profile', authMiddleware, profile);

export default router;
