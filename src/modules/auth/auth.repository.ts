import { UserModel, IUser } from './auth.model';

export class AuthRepository {
  create(data: Partial<IUser>) {
    return UserModel.create(data);
  }

  findByEmail(email: string) {
    // explicitly include `password` to ensure login has access to the hashed password
    return UserModel.findOne({ email }).select('+password');
  }

  findById(id: string) {
    return UserModel.findById(id).select('-password');
  }

  update(id: string, data: Partial<IUser>) {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }
}
