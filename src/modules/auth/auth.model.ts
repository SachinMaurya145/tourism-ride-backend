import { Schema, model, Document } from 'mongoose';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'USER'
  | 'DRIVER'
  | 'OWNER';

export interface IUser extends Document {
  createdAt: Date;
  name: string;
  email: string;
  password: string; // 🔒 REQUIRED
  role: UserRole;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'ADMIN', 'USER', 'DRIVER', 'OWNER'],
      default: 'USER'
    }
  },
  { timestamps: true }
);

export const UserModel = model<IUser>('User', userSchema);
