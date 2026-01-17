import { Request, Response, NextFunction } from 'express';
import { AdminService } from './admin.service';
import { HTTP_STATUS } from '@utils/httpStatus';

const adminService = new AdminService();

export const getDashboardStats = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await adminService.getDashboardStats();
        res.status(HTTP_STATUS.OK).json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await adminService.getAllUsers();
        res.status(HTTP_STATUS.OK).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};

export const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;
        const result = await adminService.updateUserRole(userId, role);
        res.status(HTTP_STATUS.OK).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};
