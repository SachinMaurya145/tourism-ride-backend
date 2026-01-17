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
    if (!req.user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized - Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Forbidden - You do not have permission to access this resource');
    }

    next();
  };
}
