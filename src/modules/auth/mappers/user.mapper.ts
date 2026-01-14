import { IUser } from '../auth.model';
import { UserResponseDTO } from '../dto/user.response.dto';

export const mapUserToResponse = (user: IUser): UserResponseDTO => {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };
};
