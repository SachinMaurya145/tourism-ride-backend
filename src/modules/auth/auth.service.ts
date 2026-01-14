import bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { ApiError } from '../../utils/apiError';
import { HTTP_STATUS, HTTP_MESSAGE } from '../../utils/httpStatus';
import { signToken } from '../../utils/jwt';
import { mapUserToResponse } from './mappers/user.mapper';

export class AuthService {
  constructor(private repo: AuthRepository) {}

  async signup(data: any) {
    const exists = await this.repo.findByEmail(data.email);
    if (exists) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        'Email already exists'
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.repo.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'USER',
    });

    return mapUserToResponse(user);
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        HTTP_MESSAGE.UNAUTHORIZED
      );
    }

    if (!user.password) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        HTTP_MESSAGE.UNAUTHORIZED
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        HTTP_MESSAGE.UNAUTHORIZED
      );
    }

    let token: string;
    try {
      token = signToken({ id: user._id, role: user.role });
    } catch (e) {
      throw new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        'Failed to create auth token'
      );
    }

    return {
      token,
      user: mapUserToResponse(user),
    };
  }

  async profile(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        HTTP_MESSAGE.NOT_FOUND
      );
    }

    return mapUserToResponse(user);
  }
}
