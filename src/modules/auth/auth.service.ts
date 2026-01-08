import type { IUser } from './auth.model';
import { createUser } from './auth.repository';
import { findByEmail, findById } from './auth.repository';

// Minimal service stubs (no real hashing or JWT)
export async function register(name: string, email: string, _password: string) {
  const existing = await findByEmail(email);
  if (existing) throw new Error('User already exists');

  const user = await createUser({ name, email });
  return { user, token: 'stub-token' };
}

export async function login(email: string, _password: string) {
  const user = await findByEmail(email);
  if (!user) throw new Error('Invalid credentials');
  return { user, token: 'stub-token' };
}

export async function getProfile(userId: string) {
  const user = await findById(userId);
  if (!user) return null;
  return user as IUser;
}
