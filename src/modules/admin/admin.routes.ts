import { Router } from 'express';
import { getDashboardStats, getAllUsers, updateUserRole } from './admin.controller';
import { authMiddleware } from '@middlewares/auth.middleware';
import { authorizeRoles } from '@middlewares/role.middleware';
import { ROLES } from '@constants/roles';

const router = Router();

// All admin routes require authentication and ADMIN/SUPER_ADMIN roles
router.use(authMiddleware);
router.use(authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN));

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.patch('/users/:userId/role', updateUserRole);

export default router;
