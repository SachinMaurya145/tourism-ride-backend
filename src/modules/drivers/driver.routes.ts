// Driver routes
import { Router } from 'express';
import { authorizeRoles } from '@middlewares/role.middleware';
import { ROLES } from '@constants/roles';

const router = Router();

// Example route: Get all drivers - Admin only
router.get('/', authorizeRoles(ROLES.ADMIN, ROLES.SUPER_ADMIN), (req, res) => {
    res.json({ message: 'Driver list retrieved' });
});

// Example route: Driver info - Only for drivers and admins
router.get('/my-info', authorizeRoles(ROLES.DRIVER, ROLES.ADMIN, ROLES.SUPER_ADMIN), (req, res) => {
    res.json({ message: 'Driver info retrieved', driver: (req as any).user });
});

export default router;
