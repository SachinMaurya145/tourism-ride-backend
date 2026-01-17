export const ROLES = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    USER: 'USER',
    DRIVER: 'DRIVER',
    OWNER: 'OWNER',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
