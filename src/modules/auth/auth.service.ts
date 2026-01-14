import bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { signToken } from '../../utils/jwt';
import { mapUserToResponse } from './mappers/user.mapper';

export class AuthService {
  constructor(private repo: AuthRepository) {}

  async signup(data: any) {
    const existing = await this.repo.findByEmail(data.email);
    if (existing) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.repo.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'USER'
    });

    return mapUserToResponse(user); // 🔥 DTO returned
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = signToken({
      id: user._id,
      role: user.role
    });

    return {
      token,
      user: mapUserToResponse(user)
    };
  }

  async profile(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new Error('User not found');

    return mapUserToResponse(user);
  }
}
