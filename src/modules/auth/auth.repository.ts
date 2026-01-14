import { UserModel, IUser } from './auth.model';

export class AuthRepository {
  create(data: Partial<IUser>) {
    return UserModel.create(data);
  }

  findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  findById(id: string) {
    return UserModel.findById(id).select('-password');
  }
}
