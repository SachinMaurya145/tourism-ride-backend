import type { IUser } from './auth.model';
import { createUserObj } from './auth.model';

// Very small in-memory store for stubs
const users: IUser[] = [];

export async function createUser(data: Partial<IUser>): Promise<IUser> {
  const id = String(users.length + 1);
  const user = createUserObj({ ...data, id });
  users.push(user);
  return user;
}

export async function findByEmail(email: string): Promise<IUser | null> {
  return users.find(u => u.email === email) || null;
}

export async function findById(id: string): Promise<IUser | null> {
  return users.find(u => u.id === id) || null;
}
