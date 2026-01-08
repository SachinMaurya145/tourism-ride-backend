// Minimal user type and factory (in-memory-friendly)
export interface IUser {
  id: string;
  name: string;
  email: string;
}

export function createUserObj(data: Partial<IUser> = {}): IUser {
  return {
    id: data.id || '1',
    name: data.name || 'Anonymous',
    email: data.email || 'example@example.com',
  };
}
