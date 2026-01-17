import { Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import { HTTP_STATUS } from '../utils/httpStatus';
import { Role } from '../constants/roles';

/**
 * Middleware to authorize specific roles
 * @param roles - Array of allowed roles
 */
export function authorizeRoles(...roles: Role[]) {
  return (req: any, _res: Response, next: NextFunction) => {
    console.log('--- Authorize Roles Start ---');
    console.log('Allowed Roles:', roles);
    console.log('req.user:', req.user);

    if (!req.user) {
      console.log('Authorize Failed: req.user is missing');
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized - Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      console.log(`Authorize Failed: User role ${req.user.role} not in allowed roles`);
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Forbidden - You do not have permission to access this resource');
    }

    console.log('Authorize Success: Role permitted');
    next();
  };
}
