// User routes
import { Router } from 'express';
import { authorizeRoles } from '@middlewares/role.middleware';
import { ROLES } from '@constants/roles';

const router = Router();

// Example route: Get all users - Admin only
router.get('/', authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), (req, res) => {
    res.json({ message: 'User list retrieved' });
});

// Example route: User profile - Authenticated user/driver/owner
router.get('/profile', authorizeRoles(ROLES.USER, ROLES.DRIVER, ROLES.OWNER, ROLES.ADMIN, ROLES.SUPER_ADMIN), (req, res) => {
    res.json({ message: 'User profile retrieved', user: (req as any).user });
});

export default router;
